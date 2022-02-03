const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const express = require('express')
const app = express()


async function main() {
    await prisma.user.create({
        data: {
            pseudo: 'Peter Parker',
            email: 'spidey@prisma.io',
            posts: {
                create: {title: 'First Post'},
            },
            profile: {
                create: {bio: 'I am Spiderman'},
            },
        }
    })

    const allUsers = await prisma.user.findMany({
        include: {
            posts: true,
            profile: true,
        },
    })
    console.dir(allUsers, {depth: null})

    const posts = await prisma.post.update({
        where: {id: 1},
        data: {published: true},
    })
    console.log(posts)
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })