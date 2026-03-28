import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middlewares/jwt.js';

const router = express.Router();
const prisma = new PrismaClient();



// follow toggle request

router.post('/toggle/:id', authenticateToken, async(req, res) => {
    try {
        const followingId = parseInt(req.params.id);
        const followerId = req.user.id;

        if(!followingId) 
            return res.status(400).json({ error: 'Geçersiz kullanıcı ID!' });

        if(followingId === followerId)
            return res.status(400).json({ error: 'Kendini takip edemezsin!' });

        const isFollowing = await prisma.follow.findFirst({
            where: {
                followerId: followerId,
                followingId: followingId
            }
        });

        if(isFollowing) {
            await prisma.follow.delete({
                where: { id: isFollowing.id }
            });
            return res.status(200).json({ message: 'Takipten çıkıldı!' });
        }

        await prisma.follow.create({
            data: {
                followerId: followerId,
                followingId: followingId
            }
        });
        return res.status(200).json({ message: 'Takip işlemi başarılı!' });

    }
    catch(err) {
        return res.status(500).json({ error: `Bir hata oluştu: ${err}` });
    }
});



//get follower 

router.get('/followers/:id',authenticateToken,async(req,res)=>{
    try{
        const followerId=parseInt(req.params.id);
        
        if(!followerId)
            return res.status(400).json({error: `Bir hata oluştu`});

        const followers=await prisma.follow.findMany({
            where:{followingId:followerId},
            include: { follower: { select: { id: true, username: true } } } 
        })

        return res.status(200).json({followers:followers});


    }
    catch(err){
        return res.status(500).json({error: `Bir hata oluştu : ${err}`});
    }

})


// get followings

router.get('/following/:id',authenticateToken,async(req,res)=>{

    try{
        const followingId=parseInt(req.params.id);
        
        if(!followingId)
            return res.status(401).json({error:'Bir hata oluştu'});

        const followings=await prisma.follow.findMany({
            where:{followerId:followingId},
            include: { following: { select: { id: true, username: true } } } 
        })

        return res.status(200).json({followings:followings});

    }
    catch(err)
    {
        return res.status(400).json({error:`Bir hata ile karşılaştık : ${err}`});
    }

})


export default router;