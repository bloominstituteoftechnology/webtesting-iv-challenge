const req = require('supertest');
const server = server('./server');

describe('server.js',()=>{
    describe('GET/',() => {
        it('should return an OK (200)', async () => {
           const res = await req(server).get('/');
          expect(res.status).toBe(200);
        });
    });
    
    describe('POST /api/forms', () => {
       it('should return  (201)', async () => {
           const res = await req(server).post('/api/forms')
           .send({ some_data: {} });
           expect(res.status).toBe(201);
          
        }); 
        it('should return form id', async () => {
           const res = await req(server).post('/api/forms')
           .send({ some_data: {} });
        expect(typeof res.body).toBe('number'); 
           
        });
        
    }); 
    describe('DELETE /api/forms/:id', () => {
       it('should return accepted  (202)', async () => {
            const res = await req(server).delete('/api/forms/1');
            expect(res.status).toBe(202);
         
        }); 
        it('should delete specified form', async () => {
            const res = await req(server).delete('/api/forms/2');
            expect(res.body).toBe(1);  
         
        });
       
 it('should return  (404) if id not found', async () => {
            const res = await req(server).delete('/api/forms/-dos!');
            expect(res.status).toBe(404);
           
        });
     
    });
    
}); 

   
 