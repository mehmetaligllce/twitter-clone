import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middlewares/jwt.js';

const router=express.Router();
const prisma=new PrismaClient();

router.post('/create-tweet',authenticateToken,async(req,res)=>{
    const content=req.body.content;
    if(!content)
        return res.status(400).json({error:'Hata : Tweet boş olamaz'});
    try{
        const tweet=await prisma.tweet.create({
            data:{
                content:content,
                authorId:req.user.id
            }
        })
        return res.status(201).json({message:'Tweet başarıyla oluşturuldu !'});
    }
    catch(err){
        return res.status(500).json({error:`Hata :${err}`});
    }
})

router.delete('/delete-tweet/:id', authenticateToken, async(req, res) => {
    const id = parseInt(req.params.id);

    if(!id) 
        return res.status(400).json({error:'Hata oluştu'});

    try {
        const tweet = await prisma.tweet.findUnique({ where: { id: id } });
        
        if (!tweet)
            return res.status(404).json({error: 'Tweet bulunamadı!'});
        if (tweet.authorId !== req.user.id)
            return res.status(403).json({error: 'Bu tweeti silmeye yetkiniz yok!'});

        await prisma.tweet.delete({
            where: { id: id }
        });
        return res.status(200).json({message: 'Tweet başarıyla silindi!'});
    }
    catch(err){
        return res.status(500).json({error:`Bir hata oluştu: ${err}`})
    }
});

router.put('/update-tweet/:id', authenticateToken, async(req, res) => {
    const id = parseInt(req.params.id);
    const content = req.body.content;

    if(!id || !content) 
        return res.status(400).json({error:'Hata oluştu'});

    try {
        const tweet = await prisma.tweet.findUnique({ where: { id: id } });
        if (!tweet) return res.status(404).json({error: 'Tweet bulunamadı!'});

        if (tweet.authorId !== req.user.id)
            return res.status(403).json({error: 'Bu tweeti güncellemeye yetkiniz yok!'});

        await prisma.tweet.update({
            where: { id: id },
            data: { content: content }
        });
        return res.status(200).json({message: 'Tweet başarıyla güncellendi!'});
    }
    catch(err) {
        return res.status(500).json({error: `Bir hata oluştu: ${err}`});
    }
});

router.post('/like/:id',authenticateToken,async(req,res)=>{

    const id=parseInt(req.params.id);

    if(!id)
        return res.status(400).json({error:'Bir hata oluştu'});
    
    try{
        const isLiked=await prisma.like.findFirst({
            where:{
                userId:req.user.id,
                tweetId:id
            }
        })

        if(isLiked){
            await prisma.like.delete({
                where: {
                    id: isLiked.id
                }
            })
        }
        else {
            await prisma.like.create({
                data:{
                    userId:req.user.id,
                    tweetId:id
                }
            })
        }
        return res.status(200).json({message:'Beğenme başarılı !'})

    }
    catch(err){
        return res.status(500).json({error:`Bir hata oluştu ${err}`});
    }

})

//get user tweets 

router.get('/user-tweets',authenticateToken,async(req,res)=>{
    try{
        const userId=req.user.id;
        const tweets=await prisma.tweet.findMany({
            where:{authorId:userId}
        })

        return res.status(200).json({tweets:tweets});

    }
    catch(err)
    {
        return res.status(400).json({error:`Bir hata ile karşılaştık :${err}`})
    }
})








// GET THE GLOBAL FEED 
router.get('/feed', authenticateToken, async(req, res) => {
    try {
        const feed = await prisma.tweet.findMany({
            orderBy: {
                createdAt: 'desc' 
            },
            include: {
                author: {
                    select: { 
                        id: true, 
                        username: true,
                        followers: { select: { followerId: true } } ,
                    } 
                },
                likes: true,
                _count:{
                    select:{comments:true}
                }
            }
        });

        return res.status(200).json({ tweets: feed });
    }
    catch(err) {
        return res.status(500).json({ error: `Hata oluştu: ${err}` });
    }
});

router.get('/user-tweets/:userId', authenticateToken, async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const tweets = await prisma.tweet.findMany({
            where: { authorId: userId },
            orderBy: { createdAt: 'desc' },
            include: {
                author: {
                    select: { 
                        id: true, 
                        username: true,
                        followers: { select: { followerId: true } }
                    } 
                },
                likes: true,
                _count: { select: { comments: true } }
            }
        });
        return res.status(200).json({ tweets });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

export default router;   