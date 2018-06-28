const Char = require('./Character');
const mongoose = require("mongoose")

describe('char model',  () => {
    const ron = {charName: "Ronald Weasley", birthday: "1 March 1980", wand: "Willow and unicorn tail, fourteen inch", house: "Gryffindor"};
    const hermione = {charName: "Hermione Grainger", birthday: "19 Sepetember 1979", wand: "Dragon heartrsting core, ten and three-quarter inches, vine wood", house: "Gryffindor"}
    const harry = {charName: "Harry Potter", birthday: "31 July 1980", wand: "Holly and Phoenix feather, eleven inches", house: "Gryffindor"};
    const minerva = { charName: "Minerva McGonagall", birthday: "4 October", wand: "Fir and dragon heartstring, nine and a half inches", house: "Gryffindor"};
    
    beforeAll(() => {
        return mongoose.connect("mongodb://localhost/testDb")
    });

    afterEach(() => {
        return Char.remove();
    })

    afterAll(()=>{
        return mongoose.disconnect();
    })



    it('should create a new char and return that user\'s name, birthday, wand and house', async () => {
       
        const newChar = await Char.create (minerva)


        expect(newChar.charName).toBe("Minerva McGonagall");
        expect(newChar.birthday).toBe("4 October");
        expect(newChar.wand).toBe("Fir and dragon heartstring, nine and a half inches");
        expect(newChar.house).toBe("Gryffindor");
    });

    it('should return an object with a house name from one of the four Hogwarts\' houses', async () => {
        
        const newChar = await Char.create(ron);

        expect(newChar.house).toBe("Gryffindor"|| "Syltherin"|| "Ravenclaw" || "Hufflepuff");
    });

    it('object entries should be strings', async () => {
        const newChar = await Char.create(harry);

        expect(typeof newChar.charName).toBe("string");
        expect(typeof newChar.birthday).toBe("string");
        expect(typeof newChar.wand).toBe("string");
        expect(typeof newChar.house).toBe("string");
    });

    it('new character should be an object', async () => {
        const newChar = await Char.create(ron);

        expect(typeof newChar).toBe('object');
    })
});