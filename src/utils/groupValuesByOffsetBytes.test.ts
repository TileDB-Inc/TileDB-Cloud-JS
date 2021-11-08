import groupValuesByOffsetBytes from "./groupValuesByOffsetBytes";
import convertToArray from "./convertToArray";

describe("groupValuesByOffsets()", () => {
  it("Should group numbers by offsets", () => {
    const result = groupValuesByOffsetBytes(
      [33, 28, 35, 49, 122, 322, 199, 301, 234, 123, 99, 88],
      [0, 2, 3, 5, 9]
    );
    expect(result).toEqual([
      [33, 28],
      [35],
      [49, 122],
      [322, 199, 301, 234],
      [123, 99, 88],
    ]);
  });

  it("Should group values by offsets for strings", () => {
    const offsets = [
      0, 11, 29, 39, 56, 66, 82, 92, 104, 112, 121, 135, 146, 160, 177, 196,
      208, 221, 230, 243, 251, 260, 268, 277, 287, 297, 308, 324, 337, 351, 364,
      371,
    ];
    const str = `AMC JavelinCadillac FleetwoodCamaro Z28Chrysler ImperialDatsun 710Dodge ChallengerDuster 360Ferrari DinoFiat 128Fiat X1-9Ford Pantera LHonda CivicHornet 4 DriveHornet SportaboutLincoln ContinentalLotus EuropaMaserati BoraMazda RX4Mazda RX4 WagMerc 230Merc 240DMerc 280Merc 280CMerc 450SEMerc 450SLMerc 450SLCPontiac FirebirdPorsche 914-2Toyota CorollaToyota CoronaValiantVolvo 142E`;
    const result = groupValuesByOffsetBytes(convertToArray(str), offsets);
    expect(result.map((s) => s.join(""))).toEqual([
      "AMC Javelin",
      "Cadillac Fleetwood",
      "Camaro Z28",
      "Chrysler Imperial",
      "Datsun 710",
      "Dodge Challenger",
      "Duster 360",
      "Ferrari Dino",
      "Fiat 128",
      "Fiat X1-9",
      "Ford Pantera L",
      "Honda Civic",
      "Hornet 4 Drive",
      "Hornet Sportabout",
      "Lincoln Continental",
      "Lotus Europa",
      "Maserati Bora",
      "Mazda RX4",
      "Mazda RX4 Wag",
      "Merc 230",
      "Merc 240D",
      "Merc 280",
      "Merc 280C",
      "Merc 450SE",
      "Merc 450SL",
      "Merc 450SLC",
      "Pontiac Firebird",
      "Porsche 914-2",
      "Toyota Corolla",
      "Toyota Corona",
      "Valiant",
      "Volvo 142E",
    ]);
  });
});
