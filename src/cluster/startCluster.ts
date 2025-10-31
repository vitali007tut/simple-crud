import { spawn } from 'child_process';
import { cpus } from 'os';
import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.PORT) || 4000;
const numWorkers = cpus().length - 1;

for (let i = 0; i < numWorkers; i++) {
    const workerPort = PORT + i + 1;
    spawn('npx', ['ts-node', 'src/cluster/worker.ts', workerPort.toString()], {
        stdio: 'inherit',
        shell: true,
    });
}

spawn('npx', ['ts-node', 'src/cluster/balancer.ts'], {
    stdio: 'inherit',
    shell: true,
});
