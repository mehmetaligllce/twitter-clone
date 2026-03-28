import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middlewares/jwt.js';


const router = express.Router();
const prisma = new PrismaClient();

router.post('/create-comment/:tweetId', authenticateToken, async (req, res) => {
    const content = req.body.content;

    if (!content)
        return res.status(400).json({ error: 'Yorum boş olamaz ! ' });

    try {
        const comment = await prisma.comment.create({
            data: {
                content: content,
                tweetId: parseInt(req.params.tweetId),
                authorId: parseInt(req.user.id)
            }
        })
        return res.status(201).json({ message: 'Yorum başarıyla oluşturuldu !' });
    }
    catch (err) {
        return res.status(500).json({ error: `Bir hata ile karşılaştık :${err.message}` })
    }

});


router.get('/:tweetId', authenticateToken, async (req, res) => {

    const tweetId = parseInt(req.params.tweetId);

    if (!tweetId)
        return res.status(400).json({ error: 'Bir hata ile karşılaştık ! ' });

    try {
        const comments = await prisma.comment.findMany({
            where: {
                tweetId: tweetId
            },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                    }
                }

            }
        })
        return res.status(200).json({ comments: comments });

    }
    catch (err) {
        return res.status(500).json({ error: `Bir hata ile karşılaştık :${err.message}` });
    }
});

router.delete('/delete-comment/:commentId', authenticateToken, async (req, res) => {
    const commentId = parseInt(req.params.commentId);

    if (!commentId)
        return res.status(400).json({ error: 'Hata oluştu' });

    try {
        const comment = await prisma.comment.findUnique({ where: { id: commentId } });

        if (!comment)
            return res.status(404).json({ error: 'Yorum bulunamadı!' });
            
        if (comment.authorId !== req.user.id)
            return res.status(403).json({ error: 'Bu yorumu silmeye yetkiniz yok!' });

        await prisma.comment.delete({
            where: { id: commentId }
        });
        return res.status(200).json({ message: 'Yorum başarıyla silindi!' });
    }
    catch (err) {
        return res.status(500).json({ error: `Bir hata oluştu: ${err.message}` })
    }
});

export default router