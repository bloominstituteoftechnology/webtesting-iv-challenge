const mongoose = require("mongoose");
const chai = require("chai");
const sinon = require("sinon");
const {expect} = chai;
const Painter = require("./painterModels");

describe("Painters", () => {
    describe("getPainterName", () => {
        it("should return the painter's name", () => {
            const newPainter = Painter({
                name: "Franz Kline",
                style: "Abstract-Expressionist"
            }).save();
            expect(newPainter.getPainterName()).to.equal("Franz Kline");
        });
    });

    describe("getAllPainters", () => {
        it("should return all painters", () => {
            sinon.stub(Painter, "find");
            // const cb = () => { return };
            Painter.find.yields(null, [
                {
                    name: "van Gogh",
                    style: "Post-Impressionism"
                },
                {
                    name: "Franz Kline",
                    style: "Abstract-Expressionist"
                }
            ]);
            Painter.getAllPainters(painters => {
                console.log('test');
                expect(painters.length).to.equal(2);
                expect(painters[1].name).to.equal("Franz Kline");
            });
        });
    });
});
