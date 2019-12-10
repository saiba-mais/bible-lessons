(function() {
  var bcv_parser;

  bcv_parser = require("../../js/ka_bcv_parser.js").bcv_parser;

  describe("Parsing", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.options.osis_compaction_strategy = "b";
      return p.options.sequence_combination_strategy = "combine";
    });
    it("should round-trip OSIS references", function() {
      var bc, bcv, bcv_range, book, books, i, len, results;
      p.set_options({
        osis_compaction_strategy: "bc"
      });
      books = ["Gen", "Exod", "Lev", "Num", "Deut", "Josh", "Judg", "Ruth", "1Sam", "2Sam", "1Kgs", "2Kgs", "1Chr", "2Chr", "Ezra", "Neh", "Esth", "Job", "Ps", "Prov", "Eccl", "Song", "Isa", "Jer", "Lam", "Ezek", "Dan", "Hos", "Joel", "Amos", "Obad", "Jonah", "Mic", "Nah", "Hab", "Zeph", "Hag", "Zech", "Mal", "Matt", "Mark", "Luke", "John", "Acts", "Rom", "1Cor", "2Cor", "Gal", "Eph", "Phil", "Col", "1Thess", "2Thess", "1Tim", "2Tim", "Titus", "Phlm", "Heb", "Jas", "1Pet", "2Pet", "1John", "2John", "3John", "Jude", "Rev"];
      results = [];
      for (i = 0, len = books.length; i < len; i++) {
        book = books[i];
        bc = book + ".1";
        bcv = bc + ".1";
        bcv_range = bcv + "-" + bc + ".2";
        expect(p.parse(bc).osis()).toEqual(bc);
        expect(p.parse(bcv).osis()).toEqual(bcv);
        results.push(expect(p.parse(bcv_range).osis()).toEqual(bcv_range));
      }
      return results;
    });
    it("should round-trip OSIS Apocrypha references", function() {
      var bc, bcv, bcv_range, book, books, i, j, len, len1, results;
      p.set_options({
        osis_compaction_strategy: "bc",
        ps151_strategy: "b"
      });
      p.include_apocrypha(true);
      books = ["Tob", "Jdt", "GkEsth", "Wis", "Sir", "Bar", "PrAzar", "Sus", "Bel", "SgThree", "EpJer", "1Macc", "2Macc", "3Macc", "4Macc", "1Esd", "2Esd", "PrMan", "Ps151"];
      for (i = 0, len = books.length; i < len; i++) {
        book = books[i];
        bc = book + ".1";
        bcv = bc + ".1";
        bcv_range = bcv + "-" + bc + ".2";
        expect(p.parse(bc).osis()).toEqual(bc);
        expect(p.parse(bcv).osis()).toEqual(bcv);
        expect(p.parse(bcv_range).osis()).toEqual(bcv_range);
      }
      p.set_options({
        ps151_strategy: "bc"
      });
      expect(p.parse("Ps151.1").osis()).toEqual("Ps.151");
      expect(p.parse("Ps151.1.1").osis()).toEqual("Ps.151.1");
      expect(p.parse("Ps151.1-Ps151.2").osis()).toEqual("Ps.151.1-Ps.151.2");
      p.include_apocrypha(false);
      results = [];
      for (j = 0, len1 = books.length; j < len1; j++) {
        book = books[j];
        bc = book + ".1";
        results.push(expect(p.parse(bc).osis()).toEqual(""));
      }
      return results;
    });
    return it("should handle a preceding character", function() {
      expect(p.parse(" Gen 1").osis()).toEqual("Gen.1");
      expect(p.parse("Matt5John3").osis()).toEqual("Matt.5,John.3");
      expect(p.parse("1Ps 1").osis()).toEqual("");
      return expect(p.parse("11Sam 1").osis()).toEqual("");
    });
  });

  describe("Localized book Gen (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Gen (ka)", function() {
      
		expect(p.parse("დაბადება 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("დაბ 1:1").osis()).toEqual("Gen.1.1")
		p.include_apocrypha(false)
		expect(p.parse("დაბადება 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("დაბ 1:1").osis()).toEqual("Gen.1.1")
		;
      return true;
    });
  });

  describe("Localized book Exod (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Exod (ka)", function() {
      
		expect(p.parse("გამოსვლა 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("გამ 1:1").osis()).toEqual("Exod.1.1")
		p.include_apocrypha(false)
		expect(p.parse("გამოსვლა 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("გამ 1:1").osis()).toEqual("Exod.1.1")
		;
      return true;
    });
  });

  describe("Localized book Bel (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Bel (ka)", function() {
      
		expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1")
		;
      return true;
    });
  });

  describe("Localized book Lev (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Lev (ka)", function() {
      
		expect(p.parse("ლევიანნი 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("ლევ 1:1").osis()).toEqual("Lev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ლევიანნი 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("ლევ 1:1").osis()).toEqual("Lev.1.1")
		;
      return true;
    });
  });

  describe("Localized book Num (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Num (ka)", function() {
      
		expect(p.parse("რიცხვნი 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("რიცხ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1")
		p.include_apocrypha(false)
		expect(p.parse("რიცხვნი 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("რიცხ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1")
		;
      return true;
    });
  });

  describe("Localized book Sir (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Sir (ka)", function() {
      
		expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1")
		;
      return true;
    });
  });

  describe("Localized book Wis (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Wis (ka)", function() {
      
		expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1")
		;
      return true;
    });
  });

  describe("Localized book Lam (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Lam (ka)", function() {
      
		expect(p.parse("გოდება იერემიასი 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("გოდ 1:1").osis()).toEqual("Lam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("გოდება იერემიასი 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("გოდ 1:1").osis()).toEqual("Lam.1.1")
		;
      return true;
    });
  });

  describe("Localized book EpJer (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: EpJer (ka)", function() {
      
		expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1")
		;
      return true;
    });
  });

  describe("Localized book Rev (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Rev (ka)", function() {
      
		expect(p.parse("გამოცხადება 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("გამოცხ 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("გამოცხადება 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("გამოცხ 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1")
		;
      return true;
    });
  });

  describe("Localized book PrMan (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: PrMan (ka)", function() {
      
		expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1")
		;
      return true;
    });
  });

  describe("Localized book Deut (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Deut (ka)", function() {
      
		expect(p.parse("მეორე რჯული 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("რჯლ 1:1").osis()).toEqual("Deut.1.1")
		p.include_apocrypha(false)
		expect(p.parse("მეორე რჯული 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("რჯლ 1:1").osis()).toEqual("Deut.1.1")
		;
      return true;
    });
  });

  describe("Localized book Josh (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Josh (ka)", function() {
      
		expect(p.parse("იესო ნავეს ძე 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("იესო 1:1").osis()).toEqual("Josh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("იესო ნავეს ძე 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("იესო 1:1").osis()).toEqual("Josh.1.1")
		;
      return true;
    });
  });

  describe("Localized book Judg (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Judg (ka)", function() {
      
		expect(p.parse("მსაჯული 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("მსაჯ 1:1").osis()).toEqual("Judg.1.1")
		p.include_apocrypha(false)
		expect(p.parse("მსაჯული 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("მსაჯ 1:1").osis()).toEqual("Judg.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ruth (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Ruth (ka)", function() {
      
		expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("რუთი 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("რუთ 1:1").osis()).toEqual("Ruth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("რუთი 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("რუთ 1:1").osis()).toEqual("Ruth.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Esd (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Esd (ka)", function() {
      
		expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Esd (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Esd (ka)", function() {
      
		expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Sam (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Sam (ka)", function() {
      
		expect(p.parse("2 მეფეთა 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2მეფ 1:1").osis()).toEqual("2Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 მეფეთა 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2მეფ 1:1").osis()).toEqual("2Sam.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Sam (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Sam (ka)", function() {
      
		expect(p.parse("1 მეფეთა 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1მეფ 1:1").osis()).toEqual("1Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 მეფეთა 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1მეფ 1:1").osis()).toEqual("1Sam.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Kgs (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Kgs (ka)", function() {
      
		expect(p.parse("4 მეფეთა 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("4მეფ 1:1").osis()).toEqual("2Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("4 მეფეთა 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("4მეფ 1:1").osis()).toEqual("2Kgs.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Kgs (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Kgs (ka)", function() {
      
		expect(p.parse("3 მეფეთა 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("3მეფ 1:1").osis()).toEqual("1Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("3 მეფეთა 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("3მეფ 1:1").osis()).toEqual("1Kgs.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Chr (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Chr (ka)", function() {
      
		expect(p.parse("2 ნეშტთა 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2ნეშტ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 ნეშტთა 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2ნეშტ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Chr (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Chr (ka)", function() {
      
		expect(p.parse("1 ნეშტთა 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1ნეშტ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 ნეშტთა 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1ნეშტ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ezra (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Ezra (ka)", function() {
      
		expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("ეზრა 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("ეზრ 1:1").osis()).toEqual("Ezra.1.1")
		p.include_apocrypha(false)
		expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("ეზრა 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("ეზრ 1:1").osis()).toEqual("Ezra.1.1")
		;
      return true;
    });
  });

  describe("Localized book Neh (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Neh (ka)", function() {
      
		expect(p.parse("ნეემია 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("ნეემ 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ნეემია 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("ნეემ 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1")
		;
      return true;
    });
  });

  describe("Localized book GkEsth (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: GkEsth (ka)", function() {
      
		expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1")
		;
      return true;
    });
  });

  describe("Localized book Esth (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Esth (ka)", function() {
      
		expect(p.parse("ესთერი 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("ესთ 1:1").osis()).toEqual("Esth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ესთერი 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("ესთ 1:1").osis()).toEqual("Esth.1.1")
		;
      return true;
    });
  });

  describe("Localized book Job (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Job (ka)", function() {
      
		expect(p.parse("იობი 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("იობ 1:1").osis()).toEqual("Job.1.1")
		p.include_apocrypha(false)
		expect(p.parse("იობი 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("იობ 1:1").osis()).toEqual("Job.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ps (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Ps (ka)", function() {
      
		expect(p.parse("ფსალმუნები 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("ფსალმ 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ფსალმუნები 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("ფსალმ 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1")
		;
      return true;
    });
  });

  describe("Localized book PrAzar (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: PrAzar (ka)", function() {
      
		expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1")
		;
      return true;
    });
  });

  describe("Localized book Prov (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Prov (ka)", function() {
      
		expect(p.parse("იგავნი სოლომონისა 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("იგავ 1:1").osis()).toEqual("Prov.1.1")
		p.include_apocrypha(false)
		expect(p.parse("იგავნი სოლომონისა 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("იგავ 1:1").osis()).toEqual("Prov.1.1")
		;
      return true;
    });
  });

  describe("Localized book Eccl (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Eccl (ka)", function() {
      
		expect(p.parse("ეკლესიასტე 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("ეკლ 1:1").osis()).toEqual("Eccl.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ეკლესიასტე 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("ეკლ 1:1").osis()).toEqual("Eccl.1.1")
		;
      return true;
    });
  });

  describe("Localized book SgThree (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: SgThree (ka)", function() {
      
		expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1")
		;
      return true;
    });
  });

  describe("Localized book Song (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Song (ka)", function() {
      
		expect(p.parse("ქებათა-ქება სოლომონისა 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("ქებ 1:1").osis()).toEqual("Song.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ქებათა-ქება სოლომონისა 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("ქებ 1:1").osis()).toEqual("Song.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jer (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jer (ka)", function() {
      
		expect(p.parse("იერემია 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("იერ 1:1").osis()).toEqual("Jer.1.1")
		p.include_apocrypha(false)
		expect(p.parse("იერემია 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("იერ 1:1").osis()).toEqual("Jer.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ezek (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Ezek (ka)", function() {
      
		expect(p.parse("ეზეკიელი 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("ეზეკ 1:1").osis()).toEqual("Ezek.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ეზეკიელი 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("ეზეკ 1:1").osis()).toEqual("Ezek.1.1")
		;
      return true;
    });
  });

  describe("Localized book Dan (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Dan (ka)", function() {
      
		expect(p.parse("დანიელი 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("დან 1:1").osis()).toEqual("Dan.1.1")
		p.include_apocrypha(false)
		expect(p.parse("დანიელი 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("დან 1:1").osis()).toEqual("Dan.1.1")
		;
      return true;
    });
  });

  describe("Localized book Amos (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Amos (ka)", function() {
      
		expect(p.parse("ამოსი 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("ამოს 1:1").osis()).toEqual("Amos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ამოსი 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("ამოს 1:1").osis()).toEqual("Amos.1.1")
		;
      return true;
    });
  });

  describe("Localized book Hos (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Hos (ka)", function() {
      
		expect(p.parse("ოსია 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("ოს 1:1").osis()).toEqual("Hos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ოსია 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("ოს 1:1").osis()).toEqual("Hos.1.1")
		;
      return true;
    });
  });

  describe("Localized book Joel (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Joel (ka)", function() {
      
		expect(p.parse("იოველი 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("იოელ 1:1").osis()).toEqual("Joel.1.1")
		p.include_apocrypha(false)
		expect(p.parse("იოველი 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("იოელ 1:1").osis()).toEqual("Joel.1.1")
		;
      return true;
    });
  });

  describe("Localized book Obad (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Obad (ka)", function() {
      
		expect(p.parse("აბდია 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("აბდ 1:1").osis()).toEqual("Obad.1.1")
		p.include_apocrypha(false)
		expect(p.parse("აბდია 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("აბდ 1:1").osis()).toEqual("Obad.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jonah (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jonah (ka)", function() {
      
		expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("იონა 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("იონ 1:1").osis()).toEqual("Jonah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("იონა 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("იონ 1:1").osis()).toEqual("Jonah.1.1")
		;
      return true;
    });
  });

  describe("Localized book Mic (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Mic (ka)", function() {
      
		expect(p.parse("მიქა 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("მიქ 1:1").osis()).toEqual("Mic.1.1")
		p.include_apocrypha(false)
		expect(p.parse("მიქა 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("მიქ 1:1").osis()).toEqual("Mic.1.1")
		;
      return true;
    });
  });

  describe("Localized book Nah (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Nah (ka)", function() {
      
		expect(p.parse("ნაუმი 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("ნაუმ 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ნაუმი 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("ნაუმ 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1")
		;
      return true;
    });
  });

  describe("Localized book Hab (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Hab (ka)", function() {
      
		expect(p.parse("აბაკუმი 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("აბაკ 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1")
		p.include_apocrypha(false)
		expect(p.parse("აბაკუმი 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("აბაკ 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1")
		;
      return true;
    });
  });

  describe("Localized book Zeph (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Zeph (ka)", function() {
      
		expect(p.parse("სოფონია 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("სოფ 1:1").osis()).toEqual("Zeph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("სოფონია 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("სოფ 1:1").osis()).toEqual("Zeph.1.1")
		;
      return true;
    });
  });

  describe("Localized book Hag (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Hag (ka)", function() {
      
		expect(p.parse("ანგია 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("ანგ 1:1").osis()).toEqual("Hag.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ანგია 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("ანგ 1:1").osis()).toEqual("Hag.1.1")
		;
      return true;
    });
  });

  describe("Localized book Zech (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Zech (ka)", function() {
      
		expect(p.parse("ზაქარია 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ზაქ 1:1").osis()).toEqual("Zech.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ზაქარია 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ზაქ 1:1").osis()).toEqual("Zech.1.1")
		;
      return true;
    });
  });

  describe("Localized book Mal (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Mal (ka)", function() {
      
		expect(p.parse("მალაქია 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("მალ 1:1").osis()).toEqual("Mal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("მალაქია 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("მალ 1:1").osis()).toEqual("Mal.1.1")
		;
      return true;
    });
  });

  describe("Localized book Matt (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Matt (ka)", function() {
      
		expect(p.parse("მათეს სახარება 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("მათ 1:1").osis()).toEqual("Matt.1.1")
		p.include_apocrypha(false)
		expect(p.parse("მათეს სახარება 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("მათ 1:1").osis()).toEqual("Matt.1.1")
		;
      return true;
    });
  });

  describe("Localized book Mark (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Mark (ka)", function() {
      
		expect(p.parse("მარკოზის სახარება 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("მარკ 1:1").osis()).toEqual("Mark.1.1")
		p.include_apocrypha(false)
		expect(p.parse("მარკოზის სახარება 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("მარკ 1:1").osis()).toEqual("Mark.1.1")
		;
      return true;
    });
  });

  describe("Localized book Luke (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Luke (ka)", function() {
      
		expect(p.parse("ლუკას სახარება 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("ლუკ 1:1").osis()).toEqual("Luke.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ლუკას სახარება 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("ლუკ 1:1").osis()).toEqual("Luke.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1John (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1John (ka)", function() {
      
		expect(p.parse("1 იოანე 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1იოან 1:1").osis()).toEqual("1John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 იოანე 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1იოან 1:1").osis()).toEqual("1John.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2John (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2John (ka)", function() {
      
		expect(p.parse("2 იოანე 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2იოან 1:1").osis()).toEqual("2John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 იოანე 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2იოან 1:1").osis()).toEqual("2John.1.1")
		;
      return true;
    });
  });

  describe("Localized book 3John (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 3John (ka)", function() {
      
		expect(p.parse("3 იოანე 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3იოან 1:1").osis()).toEqual("3John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("3 იოანე 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3იოან 1:1").osis()).toEqual("3John.1.1")
		;
      return true;
    });
  });

  describe("Localized book John (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: John (ka)", function() {
      
		expect(p.parse("იოანეს სახარება 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("John 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("იოან 1:1").osis()).toEqual("John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("იოანეს სახარება 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("იოან 1:1").osis()).toEqual("John.1.1")
		;
      return true;
    });
  });

  describe("Localized book Acts (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Acts (ka)", function() {
      
		expect(p.parse("მოციქულთა საქმეები 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("საქმე 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1")
		p.include_apocrypha(false)
		expect(p.parse("მოციქულთა საქმეები 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("საქმე 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1")
		;
      return true;
    });
  });

  describe("Localized book Rom (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Rom (ka)", function() {
      
		expect(p.parse("რომაელთა მიმართ 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("რომ 1:1").osis()).toEqual("Rom.1.1")
		p.include_apocrypha(false)
		expect(p.parse("რომაელთა მიმართ 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("რომ 1:1").osis()).toEqual("Rom.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Cor (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Cor (ka)", function() {
      
		expect(p.parse("2 კორინთელთა მიმართ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2კორ 1:1").osis()).toEqual("2Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 კორინთელთა მიმართ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2კორ 1:1").osis()).toEqual("2Cor.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Cor (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Cor (ka)", function() {
      
		expect(p.parse("1 კორინთელთა მიმართ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1კორ 1:1").osis()).toEqual("1Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 კორინთელთა მიმართ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1კორ 1:1").osis()).toEqual("1Cor.1.1")
		;
      return true;
    });
  });

  describe("Localized book Gal (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Gal (ka)", function() {
      
		expect(p.parse("გალატელთა მიმართ 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("გალ 1:1").osis()).toEqual("Gal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("გალატელთა მიმართ 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("გალ 1:1").osis()).toEqual("Gal.1.1")
		;
      return true;
    });
  });

  describe("Localized book Eph (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Eph (ka)", function() {
      
		expect(p.parse("ეფესელთა მიმართ 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("ეფეს 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ეფესელთა მიმართ 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("ეფეს 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1")
		;
      return true;
    });
  });

  describe("Localized book Phil (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Phil (ka)", function() {
      
		expect(p.parse("ფილიპელთა მიმართ 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ფილიპ 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ფილიპელთა მიმართ 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ფილიპ 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1")
		;
      return true;
    });
  });

  describe("Localized book Col (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Col (ka)", function() {
      
		expect(p.parse("კოლასელთა მიმართ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("კოლ 1:1").osis()).toEqual("Col.1.1")
		p.include_apocrypha(false)
		expect(p.parse("კოლასელთა მიმართ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("კოლ 1:1").osis()).toEqual("Col.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Thess (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Thess (ka)", function() {
      
		expect(p.parse("2 თესალონიკელთა მიმართ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2თეს 1:1").osis()).toEqual("2Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 თესალონიკელთა მიმართ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2თეს 1:1").osis()).toEqual("2Thess.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Thess (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Thess (ka)", function() {
      
		expect(p.parse("1 თესალონიკელთა მიმართ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1თეს 1:1").osis()).toEqual("1Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 თესალონიკელთა მიმართ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1თეს 1:1").osis()).toEqual("1Thess.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Tim (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Tim (ka)", function() {
      
		expect(p.parse("2 ტიმოთეს მიმართ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2ტიმ 1:1").osis()).toEqual("2Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 ტიმოთეს მიმართ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2ტიმ 1:1").osis()).toEqual("2Tim.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Tim (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Tim (ka)", function() {
      
		expect(p.parse("1 ტიმოთეს მიმართ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1ტიმ 1:1").osis()).toEqual("1Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 ტიმოთეს მიმართ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1ტიმ 1:1").osis()).toEqual("1Tim.1.1")
		;
      return true;
    });
  });

  describe("Localized book Titus (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Titus (ka)", function() {
      
		expect(p.parse("ტიტეს მიმართ 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("ტიტ 1:1").osis()).toEqual("Titus.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ტიტეს მიმართ 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("ტიტ 1:1").osis()).toEqual("Titus.1.1")
		;
      return true;
    });
  });

  describe("Localized book Phlm (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Phlm (ka)", function() {
      
		expect(p.parse("ფილიმონის მიმართ 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("ფილ 1:1").osis()).toEqual("Phlm.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ფილიმონის მიმართ 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("ფილ 1:1").osis()).toEqual("Phlm.1.1")
		;
      return true;
    });
  });

  describe("Localized book Heb (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Heb (ka)", function() {
      
		expect(p.parse("ებრაელთა მიმართ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("ებრ 1:1").osis()).toEqual("Heb.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ებრაელთა მიმართ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("ებრ 1:1").osis()).toEqual("Heb.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jas (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jas (ka)", function() {
      
		expect(p.parse("იაკობის წერილი 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("იაკ 1:1").osis()).toEqual("Jas.1.1")
		p.include_apocrypha(false)
		expect(p.parse("იაკობის წერილი 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("იაკ 1:1").osis()).toEqual("Jas.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Pet (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Pet (ka)", function() {
      
		expect(p.parse("2 პეტრეს წერილი 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2პეტრ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 პეტრეს წერილი 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2პეტრ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Pet (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Pet (ka)", function() {
      
		expect(p.parse("1 პეტრეს წერილი 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1პეტრ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 პეტრეს წერილი 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1პეტრ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jude (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jude (ka)", function() {
      
		expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("იუდა 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("იუდ 1:1").osis()).toEqual("Jude.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("იუდა 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("იუდ 1:1").osis()).toEqual("Jude.1.1")
		;
      return true;
    });
  });

  describe("Localized book Tob (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Tob (ka)", function() {
      
		expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jdt (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jdt (ka)", function() {
      
		expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1")
		;
      return true;
    });
  });

  describe("Localized book Bar (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Bar (ka)", function() {
      
		expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1")
		;
      return true;
    });
  });

  describe("Localized book Sus (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Sus (ka)", function() {
      
		expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Macc (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Macc (ka)", function() {
      
		expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book 3Macc (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 3Macc (ka)", function() {
      
		expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book 4Macc (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 4Macc (ka)", function() {
      
		expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Macc (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Macc (ka)", function() {
      
		expect(p.parse("1Macc 1:1").osis()).toEqual("1Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book Isa (ka)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Isa (ka)", function() {
      
		expect(p.parse("ესაია 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ეს 1:1").osis()).toEqual("Isa.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ესაია 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ეს 1:1").osis()).toEqual("Isa.1.1")
		;
      return true;
    });
  });

  describe("Miscellaneous tests", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should return the expected language", function() {
      return expect(p.languages).toEqual(["ka"]);
    });
    it("should handle ranges (ka)", function() {
      expect(p.parse("Titus 1:1 to 2").osis()).toEqual("Titus.1.1-Titus.1.2");
      expect(p.parse("Matt 1to2").osis()).toEqual("Matt.1-Matt.2");
      return expect(p.parse("Phlm 2 TO 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
    });
    it("should handle chapters (ka)", function() {
      expect(p.parse("Titus 1:1, თავი 2").osis()).toEqual("Titus.1.1,Titus.2");
      return expect(p.parse("Matt 3:4 თავი 6").osis()).toEqual("Matt.3.4,Matt.6");
    });
    it("should handle verses (ka)", function() {
      expect(p.parse("Exod 1:1 ლექსი 3").osis()).toEqual("Exod.1.1,Exod.1.3");
      return expect(p.parse("Phlm ლექსი 6").osis()).toEqual("Phlm.1.6");
    });
    it("should handle 'and' (ka)", function() {
      expect(p.parse("Exod 1:1 და 3").osis()).toEqual("Exod.1.1,Exod.1.3");
      return expect(p.parse("Phlm 2 და 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
    });
    it("should handle titles (ka)", function() {
      expect(p.parse("Ps 3 სათაური, 4:2, 5:სათაური").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
      return expect(p.parse("PS 3 სათაური, 4:2, 5:სათაური").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
    });
    it("should handle 'ff' (ka)", function() {
      expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
      return expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
    });
    it("should handle translations (ka)", function() {
      expect(p.parse("Lev 1 (geo)").osis_and_translations()).toEqual([["Lev.1", "geo"]]);
      return expect(p.parse("lev 1 geo").osis_and_translations()).toEqual([["Lev.1", "geo"]]);
    });
    return it("should handle boundaries (ka)", function() {
      p.set_options({
        book_alone_strategy: "full"
      });
      expect(p.parse("\u2014Matt\u2014").osis()).toEqual("Matt.1-Matt.28");
      return expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual("Matt.1.1");
    });
  });

}).call(this);
