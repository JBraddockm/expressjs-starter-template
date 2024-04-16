import App from '@src/app';
import { rootController } from '@src/controller';

const app = new App([rootController]);

app.listen();
