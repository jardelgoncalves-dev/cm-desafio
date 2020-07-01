import { Router } from 'express';

import { StoreController, ProductController } from '../controllers';

const routes = Router();

// rotas publicas
routes.get('/', async (req, res) => {
  res.send('Welcome API Template');
});

routes.get('/store', StoreController.index);
routes.post('/store', StoreController.store);
routes.get('/store/:id', StoreController.find);
routes.put('/store/:id', StoreController.edit);
routes.delete('/store/:id', StoreController.delete);

routes.get('/product', ProductController.index);
routes.post('/product', ProductController.store);
routes.get('/product/:id', ProductController.find);
routes.put('/product/:id', ProductController.edit);
routes.delete('/product/:id', ProductController.delete);

export default routes;
