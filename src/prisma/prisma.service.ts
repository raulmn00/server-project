import { Injectable, INestApplication, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

export class PrismaService extends PrismaClient implements OnModuleDestroy, OnModuleInit {
    constructor() {
        super();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
    async onModuleInit() {
        await this.$connect();
    }
    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
}
