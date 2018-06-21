const Document = require('./Document.model');

beforeAll(() => {});

describe('MongDB Document', () => {
  test.only('Must valididate required fields', async () => {
    const newDocument = new Document({
      field1: 'Hola Caracola',
      field2: 'qué pasa calbaza',
    });

    Document.create(newDocument)
      .then(response => {
        console.log('response', response);
      })
      .catch(e => {
        console.log('error', e._message);
        const validation = e._message;
        console.log('validation', validation);
        expect(validation).toEqual('Document validation failed');
      });
  });
});
