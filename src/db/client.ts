import mongoose from 'mongoose';
import config from './config';

export class DatabaseClient {
    private static instance: DatabaseClient;
    private db: typeof mongoose | null = null;

    public static getInstance(): DatabaseClient {
        if (!DatabaseClient.instance) {
            DatabaseClient.instance = new DatabaseClient();
        }
        return DatabaseClient.instance;
    }

    public async connect(uri: string): Promise<void> {
        if (this.db) {
            console.log('Already connected to the database');
            return;
        }

        try {
            this.db = await mongoose.connect(uri);
            console.log('Connected to the database');
        } catch (error) {
            console.error('Error connecting to the database:', error);
            throw error;
        }
    }

    public async disconnect(): Promise<void> {
        if (this.db) {
            await mongoose.disconnect();
            console.log('Disconnected from the database');
            this.db = null;
        } else {
            console.log('No active database connection to disconnect');
        }
    }

    public isConnected(): boolean {
        return this.db !== null && mongoose.connection.readyState === 1;
    }
}