import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express();
app.use(express.json());
app.use(cors());

app.post('/users', async (req, res) => {
    
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    
    res.status(201).json(req.body);
})

app.put('/users/:id', async (req, res) => {
    
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    
    res.status(201).json(req.body);
})

app.get('/users', async (req, res) => {
    
    let Users = []; 

    if(req.query){
        Users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    }else {
        Users = await prisma.user.findMany()
    }


    res.status(200).json(Users);
});

app.delete('/users/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ message: 'User deleted'});
})

app.listen(3000);