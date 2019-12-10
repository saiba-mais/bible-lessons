(function() {
  var bcv_parser;

  bcv_parser = require("../../js/hy_bcv_parser.js").bcv_parser;

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

  describe("Localized book Gen (hy)", function() {
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
    return it("should handle book: Gen (hy)", function() {
      
		expect(p.parse("Գիրք ծննդոց 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("Ծննդոց 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԳԻՐՔ ԾՆՆԴՈՑ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("ԾՆՆԴՈՑ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1")
		;
      return true;
    });
  });

  describe("Localized book Exod (hy)", function() {
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
    return it("should handle book: Exod (hy)", function() {
      
		expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Ելից 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Ելք 1:1").osis()).toEqual("Exod.1.1")
		p.include_apocrypha(false)
		expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("ԵԼԻՑ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("ԵԼՔ 1:1").osis()).toEqual("Exod.1.1")
		;
      return true;
    });
  });

  describe("Localized book Bel (hy)", function() {
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
    return it("should handle book: Bel (hy)", function() {
      
		expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1")
		;
      return true;
    });
  });

  describe("Localized book Lev (hy)", function() {
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
    return it("should handle book: Lev (hy)", function() {
      
		expect(p.parse("Ղեւտական 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Ղևտացոց 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՂԵՒՏԱԿԱՆ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("ՂԵՒՏԱՑՈՑ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1")
		;
      return true;
    });
  });

  describe("Localized book Num (hy)", function() {
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
    return it("should handle book: Num (hy)", function() {
      
		expect(p.parse("Թուեր 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԹՈՒԵՐ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1")
		;
      return true;
    });
  });

  describe("Localized book Sir (hy)", function() {
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
    return it("should handle book: Sir (hy)", function() {
      
		expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1")
		;
      return true;
    });
  });

  describe("Localized book Wis (hy)", function() {
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
    return it("should handle book: Wis (hy)", function() {
      
		expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1")
		;
      return true;
    });
  });

  describe("Localized book Lam (hy)", function() {
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
    return it("should handle book: Lam (hy)", function() {
      
		expect(p.parse("Սուրբ Երեմիա մարգարէի ողբը 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("Ողբ 1:1").osis()).toEqual("Lam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՍՈՒՐԲ ԵՐԵՄԻԱ ՄԱՐԳԱՐԷԻ ՈՂԲԸ 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("ՈՂԲ 1:1").osis()).toEqual("Lam.1.1")
		;
      return true;
    });
  });

  describe("Localized book EpJer (hy)", function() {
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
    return it("should handle book: EpJer (hy)", function() {
      
		expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1")
		;
      return true;
    });
  });

  describe("Localized book Rev (hy)", function() {
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
    return it("should handle book: Rev (hy)", function() {
      
		expect(p.parse("Սուրբ Հովհաննես Առաքեալի եւ աստուածաբան աւետարանչի հայտնությիւնը 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Հայտնություն 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Յայտնութիւն 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՍՈՒՐԲ ՀՈՎՀԱՆՆԵՍ ԱՌԱՔԵԱԼԻ ԵՒ ԱՍՏՈՒԱԾԱԲԱՆ ԱՒԵՏԱՐԱՆՉԻ ՀԱՅՏՆՈՒԹՅԻՒՆԸ 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("ՀԱՅՏՆՈՒԹՅՈՒՆ 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("ՅԱՅՏՆՈՒԹԻՒՆ 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1")
		;
      return true;
    });
  });

  describe("Localized book PrMan (hy)", function() {
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
    return it("should handle book: PrMan (hy)", function() {
      
		expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1")
		;
      return true;
    });
  });

  describe("Localized book Deut (hy)", function() {
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
    return it("should handle book: Deut (hy)", function() {
      
		expect(p.parse("Երկրորդ Օինաց 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Երկրորդ Օրէնք 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԵՐԿՐՈՐԴ ՕԻՆԱՑ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ԵՐԿՐՈՐԴ ՕՐԷՆՔ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1")
		;
      return true;
    });
  });

  describe("Localized book Josh (hy)", function() {
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
    return it("should handle book: Josh (hy)", function() {
      
		expect(p.parse("Նաւէի որդի Յեսուի գիրքը 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("Յեսու 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՆԱՒԷԻ ՈՐԴԻ ՅԵՍՈՒԻ ԳԻՐՔԸ 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("ՅԵՍՈՒ 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1")
		;
      return true;
    });
  });

  describe("Localized book Judg (hy)", function() {
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
    return it("should handle book: Judg (hy)", function() {
      
		expect(p.parse("Դատաւորներ 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԴԱՏԱՒՈՐՆԵՐ 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ruth (hy)", function() {
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
    return it("should handle book: Ruth (hy)", function() {
      
		expect(p.parse("Հռութ 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՀՌՈՒԹ 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Esd (hy)", function() {
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
    return it("should handle book: 1Esd (hy)", function() {
      
		expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Esd (hy)", function() {
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
    return it("should handle book: 2Esd (hy)", function() {
      
		expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1")
		;
      return true;
    });
  });

  describe("Localized book Isa (hy)", function() {
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
    return it("should handle book: Isa (hy)", function() {
      
		expect(p.parse("Եսայու մարգարէութիւնը 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("Եսայիա 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("Եսայի 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԵՍԱՅՈՒ ՄԱՐԳԱՐԷՈՒԹԻՒՆԸ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ԵՍԱՅԻԱ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ԵՍԱՅԻ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Sam (hy)", function() {
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
    return it("should handle book: 2Sam (hy)", function() {
      
		expect(p.parse("Թագաւորութիւններ Բ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2. Թագավորաց 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 Թագավորաց 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("Բ Թագավորաց 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԹԱԳԱՒՈՐՈՒԹԻՒՆՆԵՐ Բ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2. ԹԱԳԱՎՈՐԱՑ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 ԹԱԳԱՎՈՐԱՑ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("Բ ԹԱԳԱՎՈՐԱՑ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Sam (hy)", function() {
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
    return it("should handle book: 1Sam (hy)", function() {
      
		expect(p.parse("Թագաւորութիւններ Ա 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1. Թագավորաց 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 Թագավորաց 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("Ա Թագավորաց 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԹԱԳԱՒՈՐՈՒԹԻՒՆՆԵՐ Ա 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1. ԹԱԳԱՎՈՐԱՑ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 ԹԱԳԱՎՈՐԱՑ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("Ա ԹԱԳԱՎՈՐԱՑ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Kgs (hy)", function() {
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
    return it("should handle book: 2Kgs (hy)", function() {
      
		expect(p.parse("Թագաւորութիւններ Դ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("4. Թագավորաց 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("4 Թագավորաց 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("Դ Թագավորաց 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԹԱԳԱՒՈՐՈՒԹԻՒՆՆԵՐ Դ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("4. ԹԱԳԱՎՈՐԱՑ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("4 ԹԱԳԱՎՈՐԱՑ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("Դ ԹԱԳԱՎՈՐԱՑ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Kgs (hy)", function() {
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
    return it("should handle book: 1Kgs (hy)", function() {
      
		expect(p.parse("Թագաւորութիւններ Գ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("3. Թագավորաց 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("3 Թագավորաց 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("Գ Թագավորաց 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԹԱԳԱՒՈՐՈՒԹԻՒՆՆԵՐ Գ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("3. ԹԱԳԱՎՈՐԱՑ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("3 ԹԱԳԱՎՈՐԱՑ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("Գ ԹԱԳԱՎՈՐԱՑ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Chr (hy)", function() {
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
    return it("should handle book: 2Chr (hy)", function() {
      
		expect(p.parse("Երկրորդ Մնացորդաց 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("Բ Մնացորդաց 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԵՐԿՐՈՐԴ ՄՆԱՑՈՐԴԱՑ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("Բ ՄՆԱՑՈՐԴԱՑ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Chr (hy)", function() {
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
    return it("should handle book: 1Chr (hy)", function() {
      
		expect(p.parse("Առաջին Մնացորդաց 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("Ա Մնացորդաց 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԱՌԱՋԻՆ ՄՆԱՑՈՐԴԱՑ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("Ա ՄՆԱՑՈՐԴԱՑ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ezra (hy)", function() {
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
    return it("should handle book: Ezra (hy)", function() {
      
		expect(p.parse("Եզրասի առաջին գիրքը 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("Ա Եզրաս 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԵԶՐԱՍԻ ԱՌԱՋԻՆ ԳԻՐՔԸ 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("Ա ԵԶՐԱՍ 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1")
		;
      return true;
    });
  });

  describe("Localized book Neh (hy)", function() {
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
    return it("should handle book: Neh (hy)", function() {
      
		expect(p.parse("Նէեմիի գիրքը 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("Նէեմի 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՆԷԵՄԻԻ ԳԻՐՔԸ 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("ՆԷԵՄԻ 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1")
		;
      return true;
    });
  });

  describe("Localized book GkEsth (hy)", function() {
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
    return it("should handle book: GkEsth (hy)", function() {
      
		expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1")
		;
      return true;
    });
  });

  describe("Localized book Esth (hy)", function() {
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
    return it("should handle book: Esth (hy)", function() {
      
		expect(p.parse("Եսթերի գիրքը 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("Եսթեր 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԵՍԹԵՐԻ ԳԻՐՔԸ 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("ԵՍԹԵՐ 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1")
		;
      return true;
    });
  });

  describe("Localized book Job (hy)", function() {
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
    return it("should handle book: Job (hy)", function() {
      
		expect(p.parse("Յոբի գիրքը 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("Հոբ 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("Յոբ 1:1").osis()).toEqual("Job.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՅՈԲԻ ԳԻՐՔԸ 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("ՀՈԲ 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("ՅՈԲ 1:1").osis()).toEqual("Job.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ps (hy)", function() {
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
    return it("should handle book: Ps (hy)", function() {
      
		expect(p.parse("Դաւթի սաղմոսների գիրքը 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("Սաղմոս 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԴԱՒԹԻ ՍԱՂՄՈՍՆԵՐԻ ԳԻՐՔԸ 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("ՍԱՂՄՈՍ 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1")
		;
      return true;
    });
  });

  describe("Localized book PrAzar (hy)", function() {
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
    return it("should handle book: PrAzar (hy)", function() {
      
		expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1")
		;
      return true;
    });
  });

  describe("Localized book Prov (hy)", function() {
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
    return it("should handle book: Prov (hy)", function() {
      
		expect(p.parse("Առակներ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Առակաց 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԱՌԱԿՆԵՐ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("ԱՌԱԿԱՑ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1")
		;
      return true;
    });
  });

  describe("Localized book Eccl (hy)", function() {
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
    return it("should handle book: Eccl (hy)", function() {
      
		expect(p.parse("Ժողովող 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԺՈՂՈՎՈՂ 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1")
		;
      return true;
    });
  });

  describe("Localized book SgThree (hy)", function() {
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
    return it("should handle book: SgThree (hy)", function() {
      
		expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1")
		;
      return true;
    });
  });

  describe("Localized book Song (hy)", function() {
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
    return it("should handle book: Song (hy)", function() {
      
		expect(p.parse("Երգ Երգոց 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԵՐԳ ԵՐԳՈՑ 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jer (hy)", function() {
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
    return it("should handle book: Jer (hy)", function() {
      
		expect(p.parse("Երեմիայի մարգարէութիւնը 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("Երեմիա 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԵՐԵՄԻԱՅԻ ՄԱՐԳԱՐԷՈՒԹԻՒՆԸ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("ԵՐԵՄԻԱ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ezek (hy)", function() {
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
    return it("should handle book: Ezek (hy)", function() {
      
		expect(p.parse("Եզեկիէլի մարգարէութիւնը 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("Եզեկիել 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("Եզեկիէլ 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԵԶԵԿԻԷԼԻ ՄԱՐԳԱՐԷՈՒԹԻՒՆԸ 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("ԵԶԵԿԻԵԼ 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("ԵԶԵԿԻԷԼ 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1")
		;
      return true;
    });
  });

  describe("Localized book Dan (hy)", function() {
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
    return it("should handle book: Dan (hy)", function() {
      
		expect(p.parse("Դանիէլի մարգարէութիւնը 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("Դանիէլ 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԴԱՆԻԷԼԻ ՄԱՐԳԱՐԷՈՒԹԻՒՆԸ 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("ԴԱՆԻԷԼ 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1")
		;
      return true;
    });
  });

  describe("Localized book Hos (hy)", function() {
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
    return it("should handle book: Hos (hy)", function() {
      
		expect(p.parse("Օսէէի մարգարէութիւնը 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("Օսէէ 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՕՍԷԷԻ ՄԱՐԳԱՐԷՈՒԹԻՒՆԸ 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("ՕՍԷԷ 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1")
		;
      return true;
    });
  });

  describe("Localized book Joel (hy)", function() {
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
    return it("should handle book: Joel (hy)", function() {
      
		expect(p.parse("Յովէլի մարգարէութիւնը 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("Յովէլ 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՅՈՎԷԼԻ ՄԱՐԳԱՐԷՈՒԹԻՒՆԸ 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("ՅՈՎԷԼ 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1")
		;
      return true;
    });
  });

  describe("Localized book Amos (hy)", function() {
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
    return it("should handle book: Amos (hy)", function() {
      
		expect(p.parse("Ամոսի մարգարէութիւնը 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("Ամովս 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("Ամոս 1:1").osis()).toEqual("Amos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԱՄՈՍԻ ՄԱՐԳԱՐԷՈՒԹԻՒՆԸ 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("ԱՄՈՎՍ 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("ԱՄՈՍ 1:1").osis()).toEqual("Amos.1.1")
		;
      return true;
    });
  });

  describe("Localized book Obad (hy)", function() {
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
    return it("should handle book: Obad (hy)", function() {
      
		expect(p.parse("Աբդիուի մարգարէութիւնը 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("Աբդիու 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԱԲԴԻՈՒԻ ՄԱՐԳԱՐԷՈՒԹԻՒՆԸ 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("ԱԲԴԻՈՒ 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jonah (hy)", function() {
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
    return it("should handle book: Jonah (hy)", function() {
      
		expect(p.parse("Յովնանի մարգարէութիւնը 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("Յովնան 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՅՈՎՆԱՆԻ ՄԱՐԳԱՐԷՈՒԹԻՒՆԸ 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("ՅՈՎՆԱՆ 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1")
		;
      return true;
    });
  });

  describe("Localized book Mic (hy)", function() {
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
    return it("should handle book: Mic (hy)", function() {
      
		expect(p.parse("Միքիայի մարգարէութիւնը 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("Միքիա 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՄԻՔԻԱՅԻ ՄԱՐԳԱՐԷՈՒԹԻՒՆԸ 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("ՄԻՔԻԱ 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1")
		;
      return true;
    });
  });

  describe("Localized book Nah (hy)", function() {
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
    return it("should handle book: Nah (hy)", function() {
      
		expect(p.parse("Նաւումի մարգարէութիւնը 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("Նաւում 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՆԱՒՈՒՄԻ ՄԱՐԳԱՐԷՈՒԹԻՒՆԸ 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("ՆԱՒՈՒՄ 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1")
		;
      return true;
    });
  });

  describe("Localized book Hab (hy)", function() {
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
    return it("should handle book: Hab (hy)", function() {
      
		expect(p.parse("Ամբակումի մարգարէութիւնը 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("Ամբակում 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԱՄԲԱԿՈՒՄԻ ՄԱՐԳԱՐԷՈՒԹԻՒՆԸ 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("ԱՄԲԱԿՈՒՄ 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1")
		;
      return true;
    });
  });

  describe("Localized book Zeph (hy)", function() {
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
    return it("should handle book: Zeph (hy)", function() {
      
		expect(p.parse("Սոփոնիայի մարգարէութիւնը 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("Սոփոնիա 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՍՈՓՈՆԻԱՅԻ ՄԱՐԳԱՐԷՈՒԹԻՒՆԸ 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ՍՈՓՈՆԻԱ 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1")
		;
      return true;
    });
  });

  describe("Localized book Hag (hy)", function() {
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
    return it("should handle book: Hag (hy)", function() {
      
		expect(p.parse("Անգէի մարգարէութիւնը 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("Անգէ 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԱՆԳԷԻ ՄԱՐԳԱՐԷՈՒԹԻՒՆԸ 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("ԱՆԳԷ 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1")
		;
      return true;
    });
  });

  describe("Localized book Zech (hy)", function() {
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
    return it("should handle book: Zech (hy)", function() {
      
		expect(p.parse("Զաքարիայի մարգարէութիւնը 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("Զաքարիա 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԶԱՔԱՐԻԱՅԻ ՄԱՐԳԱՐԷՈՒԹԻՒՆԸ 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ԶԱՔԱՐԻԱ 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1")
		;
      return true;
    });
  });

  describe("Localized book Mal (hy)", function() {
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
    return it("should handle book: Mal (hy)", function() {
      
		expect(p.parse("Մաղաքիայի մարգարէութիւնը 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("Մաղաքիա 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՄԱՂԱՔԻԱՅԻ ՄԱՐԳԱՐԷՈՒԹԻՒՆԸ 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("ՄԱՂԱՔԻԱ 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1")
		;
      return true;
    });
  });

  describe("Localized book Matt (hy)", function() {
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
    return it("should handle book: Matt (hy)", function() {
      
		expect(p.parse("Աւետարան ըստ Մատթէոսի 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Մատթեոս 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Մատթէոս 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԱՒԵՏԱՐԱՆ ԸՍՏ ՄԱՏԹԷՈՍԻ 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("ՄԱՏԹԵՈՍ 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("ՄԱՏԹԷՈՍ 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1")
		;
      return true;
    });
  });

  describe("Localized book Mark (hy)", function() {
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
    return it("should handle book: Mark (hy)", function() {
      
		expect(p.parse("Աւետարան ըստ Մարկոսի 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("Մարկոս 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԱՒԵՏԱՐԱՆ ԸՍՏ ՄԱՐԿՈՍԻ 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("ՄԱՐԿՈՍ 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1")
		;
      return true;
    });
  });

  describe("Localized book Luke (hy)", function() {
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
    return it("should handle book: Luke (hy)", function() {
      
		expect(p.parse("Աւետարան ըստ Ղուկասի 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("Ղուկաս 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԱՒԵՏԱՐԱՆ ԸՍՏ ՂՈՒԿԱՍԻ 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("ՂՈՒԿԱՍ 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1John (hy)", function() {
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
    return it("should handle book: 1John (hy)", function() {
      
		expect(p.parse("Յովհաննէս Առաքեալի ընդհանրական առաջին թուղթը 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1. Հովհաննես 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 Հովհաննես 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("Ա Հովհաննես 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("Յովհաննէս Ա 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՅՈՎՀԱՆՆԷՍ ԱՌԱՔԵԱԼԻ ԸՆԴՀԱՆՐԱԿԱՆ ԱՌԱՋԻՆ ԹՈՒՂԹԸ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1. ՀՈՎՀԱՆՆԵՍ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 ՀՈՎՀԱՆՆԵՍ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("Ա ՀՈՎՀԱՆՆԵՍ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("ՅՈՎՀԱՆՆԷՍ Ա 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2John (hy)", function() {
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
    return it("should handle book: 2John (hy)", function() {
      
		expect(p.parse("Յովհաննէս Առաքեալի ընդհանրական երկրորդ թուղթը 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2. Հովհաննես 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 Հովհաննես 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("Բ Հովհաննես 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("Յովհաննէս Բ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՅՈՎՀԱՆՆԷՍ ԱՌԱՔԵԱԼԻ ԸՆԴՀԱՆՐԱԿԱՆ ԵՐԿՐՈՐԴ ԹՈՒՂԹԸ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2. ՀՈՎՀԱՆՆԵՍ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 ՀՈՎՀԱՆՆԵՍ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("Բ ՀՈՎՀԱՆՆԵՍ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("ՅՈՎՀԱՆՆԷՍ Բ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1")
		;
      return true;
    });
  });

  describe("Localized book 3John (hy)", function() {
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
    return it("should handle book: 3John (hy)", function() {
      
		expect(p.parse("Յովհաննէս Առաքեալի ընդհանրական երրորդ թուղթը 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3. Հովհաննես 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 Հովհաննես 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("Գ Հովհաննես 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("Յովհաննէս Գ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՅՈՎՀԱՆՆԷՍ ԱՌԱՔԵԱԼԻ ԸՆԴՀԱՆՐԱԿԱՆ ԵՐՐՈՐԴ ԹՈՒՂԹԸ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3. ՀՈՎՀԱՆՆԵՍ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 ՀՈՎՀԱՆՆԵՍ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("Գ ՀՈՎՀԱՆՆԵՍ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("ՅՈՎՀԱՆՆԷՍ Գ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1")
		;
      return true;
    });
  });

  describe("Localized book Acts (hy)", function() {
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
    return it("should handle book: Acts (hy)", function() {
      
		expect(p.parse("Գործք առաքելոց 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Գործք 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԳՈՐԾՔ ԱՌԱՔԵԼՈՑ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ԳՈՐԾՔ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1")
		;
      return true;
    });
  });

  describe("Localized book Rom (hy)", function() {
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
    return it("should handle book: Rom (hy)", function() {
      
		expect(p.parse("Պողոս Առաքեալի թուղթը հռոմէացիներին 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("Հռոմէացիներին 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("Հռոմեացիս 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՊՈՂՈՍ ԱՌԱՔԵԱԼԻ ԹՈՒՂԹԸ ՀՌՈՄԷԱՑԻՆԵՐԻՆ 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ՀՌՈՄԷԱՑԻՆԵՐԻՆ 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ՀՌՈՄԵԱՑԻՍ 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Cor (hy)", function() {
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
    return it("should handle book: 2Cor (hy)", function() {
      
		expect(p.parse("Պողոս Առաքեալի երկրորդ թուղթը կորնթացիներին 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("Կորնթացիներին Բ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. Կորնթացիս 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 Կորնթացիս 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("Բ Կորնթացիս 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՊՈՂՈՍ ԱՌԱՔԵԱԼԻ ԵՐԿՐՈՐԴ ԹՈՒՂԹԸ ԿՈՐՆԹԱՑԻՆԵՐԻՆ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("ԿՈՐՆԹԱՑԻՆԵՐԻՆ Բ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. ԿՈՐՆԹԱՑԻՍ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 ԿՈՐՆԹԱՑԻՍ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("Բ ԿՈՐՆԹԱՑԻՍ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Cor (hy)", function() {
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
    return it("should handle book: 1Cor (hy)", function() {
      
		expect(p.parse("Պողոս Առաքեալի առաջին թուղթը կորնթացիներին 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("Կորնթացիներին Ա 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. Կորնթացիս 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 Կորնթացիս 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("Ա Կորնթացիս 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՊՈՂՈՍ ԱՌԱՔԵԱԼԻ ԱՌԱՋԻՆ ԹՈՒՂԹԸ ԿՈՐՆԹԱՑԻՆԵՐԻՆ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("ԿՈՐՆԹԱՑԻՆԵՐԻՆ Ա 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. ԿՈՐՆԹԱՑԻՍ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 ԿՈՐՆԹԱՑԻՍ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("Ա ԿՈՐՆԹԱՑԻՍ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1")
		;
      return true;
    });
  });

  describe("Localized book Gal (hy)", function() {
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
    return it("should handle book: Gal (hy)", function() {
      
		expect(p.parse("Պողոս Առաքեալի թուղթը գաղատացիներին 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("Գաղատացիներին 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("Գաղատացիս 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՊՈՂՈՍ ԱՌԱՔԵԱԼԻ ԹՈՒՂԹԸ ԳԱՂԱՏԱՑԻՆԵՐԻՆ 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("ԳԱՂԱՏԱՑԻՆԵՐԻՆ 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("ԳԱՂԱՏԱՑԻՍ 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1")
		;
      return true;
    });
  });

  describe("Localized book Eph (hy)", function() {
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
    return it("should handle book: Eph (hy)", function() {
      
		expect(p.parse("Պողոս Առաքեալի թուղթը եփեսացիներին 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Եփեսացիներին 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Եփեսացիս 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՊՈՂՈՍ ԱՌԱՔԵԱԼԻ ԹՈՒՂԹԸ ԵՓԵՍԱՑԻՆԵՐԻՆ 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("ԵՓԵՍԱՑԻՆԵՐԻՆ 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("ԵՓԵՍԱՑԻՍ 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1")
		;
      return true;
    });
  });

  describe("Localized book Phil (hy)", function() {
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
    return it("should handle book: Phil (hy)", function() {
      
		expect(p.parse("Պողոս Առաքեալի թուղթը փիլիպեցիներին 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Փիլիպեցիներին 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Փիլիպպեցիս 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՊՈՂՈՍ ԱՌԱՔԵԱԼԻ ԹՈՒՂԹԸ ՓԻԼԻՊԵՑԻՆԵՐԻՆ 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ՓԻԼԻՊԵՑԻՆԵՐԻՆ 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ՓԻԼԻՊՊԵՑԻՍ 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1")
		;
      return true;
    });
  });

  describe("Localized book Col (hy)", function() {
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
    return it("should handle book: Col (hy)", function() {
      
		expect(p.parse("Պողոս Առաքեալի թուղթը Կողոսացիներին 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Կողոսացիներին 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Կողոսացիս 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՊՈՂՈՍ ԱՌԱՔԵԱԼԻ ԹՈՒՂԹԸ ԿՈՂՈՍԱՑԻՆԵՐԻՆ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("ԿՈՂՈՍԱՑԻՆԵՐԻՆ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("ԿՈՂՈՍԱՑԻՍ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Thess (hy)", function() {
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
    return it("should handle book: 2Thess (hy)", function() {
      
		expect(p.parse("Պողոս Առաքեալի երկրորդ թուղթը թեսաղոնիկեցիներին 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("Թեսաղոնիկեցիներին Բ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2. Թեսաղոնիկեցիս 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 Թեսաղոնիկեցիս 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("Բ Թեսաղոնիկեցիս 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՊՈՂՈՍ ԱՌԱՔԵԱԼԻ ԵՐԿՐՈՐԴ ԹՈՒՂԹԸ ԹԵՍԱՂՈՆԻԿԵՑԻՆԵՐԻՆ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("ԹԵՍԱՂՈՆԻԿԵՑԻՆԵՐԻՆ Բ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2. ԹԵՍԱՂՈՆԻԿԵՑԻՍ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 ԹԵՍԱՂՈՆԻԿԵՑԻՍ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("Բ ԹԵՍԱՂՈՆԻԿԵՑԻՍ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Thess (hy)", function() {
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
    return it("should handle book: 1Thess (hy)", function() {
      
		expect(p.parse("Պողոս Առաքեալի առաջին թուղթը թեսաղոնիկեցիներին 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("Թեսաղոնիկեցիներին Ա 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1. Թեսաղոնիկեցիս 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 Թեսաղոնիկեցիս 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("Ա Թեսաղոնիկեցիս 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՊՈՂՈՍ ԱՌԱՔԵԱԼԻ ԱՌԱՋԻՆ ԹՈՒՂԹԸ ԹԵՍԱՂՈՆԻԿԵՑԻՆԵՐԻՆ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("ԹԵՍԱՂՈՆԻԿԵՑԻՆԵՐԻՆ Ա 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1. ԹԵՍԱՂՈՆԻԿԵՑԻՍ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 ԹԵՍԱՂՈՆԻԿԵՑԻՍ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("Ա ԹԵՍԱՂՈՆԻԿԵՑԻՍ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Tim (hy)", function() {
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
    return it("should handle book: 2Tim (hy)", function() {
      
		expect(p.parse("Պողոս Առաքեալի երկրորդ թուղթը Տիմոթէոսին 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("Տիմոթէոսին Բ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՊՈՂՈՍ ԱՌԱՔԵԱԼԻ ԵՐԿՐՈՐԴ ԹՈՒՂԹԸ ՏԻՄՈԹԷՈՍԻՆ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("ՏԻՄՈԹԷՈՍԻՆ Բ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Tim (hy)", function() {
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
    return it("should handle book: 1Tim (hy)", function() {
      
		expect(p.parse("Պողոս Առաքեալի առաջին թուղթը Տիմոթէոսին 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("Տիմոթէոսին Ա 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՊՈՂՈՍ ԱՌԱՔԵԱԼԻ ԱՌԱՋԻՆ ԹՈՒՂԹԸ ՏԻՄՈԹԷՈՍԻՆ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("ՏԻՄՈԹԷՈՍԻՆ Ա 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1")
		;
      return true;
    });
  });

  describe("Localized book Titus (hy)", function() {
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
    return it("should handle book: Titus (hy)", function() {
      
		expect(p.parse("Պողոս Առաքեալի թուղթը Տիտոսին 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("Տիտոսին 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՊՈՂՈՍ ԱՌԱՔԵԱԼԻ ԹՈՒՂԹԸ ՏԻՏՈՍԻՆ 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("ՏԻՏՈՍԻՆ 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1")
		;
      return true;
    });
  });

  describe("Localized book Phlm (hy)", function() {
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
    return it("should handle book: Phlm (hy)", function() {
      
		expect(p.parse("Պողոս Առաքեալի թուղթը Փիլիմոնին 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("Փիլիմոնին 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՊՈՂՈՍ ԱՌԱՔԵԱԼԻ ԹՈՒՂԹԸ ՓԻԼԻՄՈՆԻՆ 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("ՓԻԼԻՄՈՆԻՆ 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1")
		;
      return true;
    });
  });

  describe("Localized book Heb (hy)", function() {
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
    return it("should handle book: Heb (hy)", function() {
      
		expect(p.parse("Թուղթ եբրայեցիներին 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("Եբրայեցիներին 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("Եբրայեցիս 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԹՈՒՂԹ ԵԲՐԱՅԵՑԻՆԵՐԻՆ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("ԵԲՐԱՅԵՑԻՆԵՐԻՆ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("ԵԲՐԱՅԵՑԻՍ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jas (hy)", function() {
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
    return it("should handle book: Jas (hy)", function() {
      
		expect(p.parse("Սուրբ Յակոբոս Առաքեալի ընդհանրական թուղթը 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Հակոբոս 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Յակոբոս 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՍՈՒՐԲ ՅԱԿՈԲՈՍ ԱՌԱՔԵԱԼԻ ԸՆԴՀԱՆՐԱԿԱՆ ԹՈՒՂԹԸ 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("ՀԱԿՈԲՈՍ 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("ՅԱԿՈԲՈՍ 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Pet (hy)", function() {
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
    return it("should handle book: 2Pet (hy)", function() {
      
		expect(p.parse("Պետրոս Առաքեալի ընդհանրական երկրորդ թուղթը 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2. Պետրոս 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 Պետրոս 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("Բ Պետրոս 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("Պետրոս Բ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՊԵՏՐՈՍ ԱՌԱՔԵԱԼԻ ԸՆԴՀԱՆՐԱԿԱՆ ԵՐԿՐՈՐԴ ԹՈՒՂԹԸ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2. ՊԵՏՐՈՍ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 ՊԵՏՐՈՍ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("Բ ՊԵՏՐՈՍ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("ՊԵՏՐՈՍ Բ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Pet (hy)", function() {
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
    return it("should handle book: 1Pet (hy)", function() {
      
		expect(p.parse("Պետրոս Առաքեալի ընդհանրական առաջին թուղթը 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1. Պետրոս 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 Պետրոս 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("Ա Պետրոս 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("Պետրոս Ա 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՊԵՏՐՈՍ ԱՌԱՔԵԱԼԻ ԸՆԴՀԱՆՐԱԿԱՆ ԱՌԱՋԻՆ ԹՈՒՂԹԸ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1. ՊԵՏՐՈՍ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 ՊԵՏՐՈՍ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("Ա ՊԵՏՐՈՍ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("ՊԵՏՐՈՍ Ա 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jude (hy)", function() {
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
    return it("should handle book: Jude (hy)", function() {
      
		expect(p.parse("Յուդա Առաքեալի ընդհանրական թուղթը 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("Յուդա 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ՅՈՒԴԱ ԱՌԱՔԵԱԼԻ ԸՆԴՀԱՆՐԱԿԱՆ ԹՈՒՂԹԸ 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("ՅՈՒԴԱ 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1")
		;
      return true;
    });
  });

  describe("Localized book Tob (hy)", function() {
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
    return it("should handle book: Tob (hy)", function() {
      
		expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jdt (hy)", function() {
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
    return it("should handle book: Jdt (hy)", function() {
      
		expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1")
		;
      return true;
    });
  });

  describe("Localized book Bar (hy)", function() {
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
    return it("should handle book: Bar (hy)", function() {
      
		expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1")
		;
      return true;
    });
  });

  describe("Localized book Sus (hy)", function() {
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
    return it("should handle book: Sus (hy)", function() {
      
		expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Macc (hy)", function() {
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
    return it("should handle book: 2Macc (hy)", function() {
      
		expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book 3Macc (hy)", function() {
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
    return it("should handle book: 3Macc (hy)", function() {
      
		expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book 4Macc (hy)", function() {
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
    return it("should handle book: 4Macc (hy)", function() {
      
		expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Macc (hy)", function() {
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
    return it("should handle book: 1Macc (hy)", function() {
      
		expect(p.parse("1Macc 1:1").osis()).toEqual("1Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book John (hy)", function() {
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
    return it("should handle book: John (hy)", function() {
      
		expect(p.parse("Աւետարան ըստ Յովհաննէսի 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("Հովհաննես 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("Յովհաննէս 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("John 1:1").osis()).toEqual("John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ԱՒԵՏԱՐԱՆ ԸՍՏ ՅՈՎՀԱՆՆԷՍԻ 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("ՀՈՎՀԱՆՆԵՍ 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("ՅՈՎՀԱՆՆԷՍ 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1")
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
      return expect(p.languages).toEqual(["hy"]);
    });
    it("should handle ranges (hy)", function() {
      expect(p.parse("Titus 1:1 to 2").osis()).toEqual("Titus.1.1-Titus.1.2");
      expect(p.parse("Matt 1to2").osis()).toEqual("Matt.1-Matt.2");
      return expect(p.parse("Phlm 2 TO 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
    });
    it("should handle chapters (hy)", function() {
      expect(p.parse("Titus 1:1, գլուխ 2").osis()).toEqual("Titus.1.1,Titus.2");
      return expect(p.parse("Matt 3:4 ԳԼՈՒԽ 6").osis()).toEqual("Matt.3.4,Matt.6");
    });
    it("should handle verses (hy)", function() {
      expect(p.parse("Exod 1:1 հատված 3").osis()).toEqual("Exod.1.1,Exod.1.3");
      return expect(p.parse("Phlm ՀԱՏՎԱԾ 6").osis()).toEqual("Phlm.1.6");
    });
    it("should handle 'and' (hy)", function() {
      expect(p.parse("Exod 1:1 և 3").osis()).toEqual("Exod.1.1,Exod.1.3");
      return expect(p.parse("Phlm 2 ԵՒ 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
    });
    it("should handle titles (hy)", function() {
      expect(p.parse("Ps 3 title, 4:2, 5:title").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
      return expect(p.parse("PS 3 TITLE, 4:2, 5:TITLE").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
    });
    it("should handle 'ff' (hy)", function() {
      expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
      return expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
    });
    it("should handle translations (hy)", function() {
      expect(p.parse("Lev 1 (m34)").osis_and_translations()).toEqual([["Lev.1", "m34"]]);
      return expect(p.parse("lev 1 m34").osis_and_translations()).toEqual([["Lev.1", "m34"]]);
    });
    it("should handle book ranges (hy)", function() {
      p.set_options({
        book_alone_strategy: "full",
        book_range_strategy: "include"
      });
      return expect(p.parse("1 to 3  Հովհաննես").osis()).toEqual("1John.1-3John.1");
    });
    return it("should handle boundaries (hy)", function() {
      p.set_options({
        book_alone_strategy: "full"
      });
      expect(p.parse("\u2014Matt\u2014").osis()).toEqual("Matt.1-Matt.28");
      return expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual("Matt.1.1");
    });
  });

}).call(this);
