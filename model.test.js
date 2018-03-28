// TEST

describe('Character', () => {
  describe('getCharacter()', () => {
    it(`should return the cahracter`, () => {
      const character = new Character({
        title: 'character'
      });
    expect(character.getCharacter()).to.equal('character');
    });
  });

  describe('getAllCharacter()', () => {
    it(`should return a list of  characters`, () => {
      sinon.stub(character, 'find');
      character.find.yields(null, []);
      character.getAllcharacter(characters => {
        expect(characters.length).to.equal(2);
        character.find.restore();
      });
    });
  });
});
