import { execFile } from "child_process";
import { join } from "path";
import { expect } from "chai";

describe("AgentCop", function () {
  this.timeout(6000);
  const cli = join(__dirname, "..", "src", "agentcop.ts");

  it("passes with a good AGENTS file", function (done) {
    const file = join(__dirname, "fixtures", "good_agents_ok.md");
    execFile("node", ["-r", "ts-node/register", cli, file], (error) => {
      expect(error).to.be.null;
      done();
    });
  });

  it("fails with a bad AGENTS file", function (done) {
    const file = join(__dirname, "fixtures", "bad_agents_missing.md");
    execFile(
      "node",
      ["-r", "ts-node/register", cli, file],
      (error, stdout, stderr) => {
        expect(error).to.be.an("Error");
        expect(error?.code).to.equal(2);
        expect(stderr).to.contain("Pressure drop");
        done();
      },
    );
  });

  it("fails on duplicate headings", function (done) {
    const file = join(__dirname, "fixtures", "duplicate_headings.md");
    execFile(
      "node",
      ["-r", "ts-node/register", cli, file],
      (error, stdout, stderr) => {
        expect(error).to.be.an("Error");
        expect(error?.code).to.equal(3);
        expect(stderr).to.contain("duplicate");
        done();
      },
    );
  });

  it("fails on empty section", function (done) {
    const file = join(__dirname, "fixtures", "empty_section.md");
    execFile(
      "node",
      ["-r", "ts-node/register", cli, file],
      (error, stdout, stderr) => {
        expect(error).to.be.an("Error");
        expect(error?.code).to.equal(4);
        expect(stderr).to.contain("section");
        done();
      },
    );
  });

  it("fails when bash block lacks commands", function (done) {
    const file = join(__dirname, "fixtures", "functional_no_command.md");
    execFile(
      "node",
      ["-r", "ts-node/register", cli, file],
      (error, stdout, stderr) => {
        expect(error).to.be.an("Error");
        expect(error?.code).to.equal(5);
        expect(stderr).to.contain("bash block");
        done();
      },
    );
  });

  it("fails when required headings out of order", function (done) {
    const file = join(__dirname, "fixtures", "out_of_order.md");
    execFile(
      "node",
      ["-r", "ts-node/register", cli, file],
      (error, stdout, stderr) => {
        expect(error).to.be.an("Error");
        expect(error?.code).to.equal(6);
        expect(stderr).to.contain("out of order");
        done();
      },
    );
  });
});
