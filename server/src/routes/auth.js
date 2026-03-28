import express from 'express';
import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../utils/bcrypt.js';
import { generateToken, authenticateToken } from '../middlewares/jwt.js';


const router = express.Router();
const prisma = new PrismaClient();


// Register post request 
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
        return res.status(400).json({ Error: 'Tüm alanlar zorunludur !' });

    try {
        const findUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: username },
                    { email: email }
                ]
            }
        })

        if (findUser !== null)
            return res.status(400).json({ Error: 'Kullanıcı adı veya e-posta zaten mevcut !' })

        const passwordHash = await hashPassword(password);
        const user = await prisma.user.create({
            data: {
                username: username,
                passwordHash: passwordHash,
                email: email
            }
        })
        return res.status(201).json({ Message: 'Kullanıcı başarıyla oluşturuldu !' })

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ Error: `Sunucu hatası ! ${err}` })
    }




})

//Login post request
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
        return res.status(400).json({ Error: 'Tüm alanlar zorunludur !' });

    try {

        const findUser = await prisma.user.findUnique({
            where: { username: username }
        });

        if (!findUser) {
            return res.status(400).json({ Error: 'Kullanıcı adı veya şifre yanlış!' });
        }

        const passwordMatch = await comparePassword(password, findUser.passwordHash);

        if (!passwordMatch) {
            return res.status(400).json({ Error: 'Kullanıcı adı veya şifre yanlış!' });
        }

        const token = generateToken(findUser.id, findUser.isAdmin);

        res.cookie('token', token, { httpOnly: true });
        res.json({ message: 'Giriş yapıldı !' })


    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ Error: `Sunucu hatası ! ${err}` })
    }




})


//Get  request
router.get('/me', authenticateToken, async (req, res) => {
    try {
        const fullUser = await prisma.user.findUnique({
             where: { id: req.user.id },
             select: { id: true, username: true, isAdmin: true, profileImage: true } 
        });

        res.status(200).json({
            message: "Giriş başarılı!",
            user: fullUser
        });
    } catch(err) {
        res.status(500).json({ error: "Sunucu hatası!" });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Çıkış yapıldı !' });
});

router.put('/update-profile',authenticateToken,async(req,res)=>{
    try{
        const id=req.user.id;
        const {username,password,profileImage}=req.body;
        const update={};

        if(username) {
            const existingUser=await prisma.user.findFirst({
                where:{username:username}
            })
            if(existingUser && existingUser.id !==id)
            {
                return res.status(400).json({error:'Kullanıcı adı zaten mevcut!'})
            }
            update.username=username;
        }
        if(password && password.length>=8)
        {
            const passwordHash=await hashPassword(password);
            update.passwordHash=passwordHash;
        }
        if(profileImage)
        {
            update.profileImage=profileImage;
        }
        await prisma.user.update({
            where:{id:id},
            data:update
        })
        return res.status(200).json({message:'Profil başarıyla güncellendi!'})
    }
    catch(err){
        return res.status(400).json({message:`Bir hata meydana geldi :${err}`});
    }


})

router.get('/profile/:id', authenticateToken, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const profileUser = await prisma.user.findUnique({
            where: { id: id },
            select: {
                id: true,
                username: true,
                profileImage: true,
                _count: {
                    select: {
                         followers: true,
                         following: true,
                         tweets: true
                    }
                }
            }
        });

        if (!profileUser) return res.status(404).json({ error: "Kullanıcı bulunamadı" });
        return res.status(200).json({ profileData: profileUser });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

export default router;
