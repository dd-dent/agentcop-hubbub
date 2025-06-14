import { execFile } from 'child_process';
import { join } from 'path';
import { expect } from 'chai';

describe('AgentCop', function () {
  const cli = join(__dirname, '..', 'src', 'agentcop.ts');

  it('passes with a good AGENTS file', function (done) {
    const file = join(__dirname, 'fixtures', 'good_agents_ok.md');
    execFile('node', ['-r', 'ts-node/register', cli, file], (error) => {
      expect(error).to.be.null;
      done();
    });
  });

  it('fails with a bad AGENTS file', function (done) {
    const file = join(__dirname, 'fixtures', 'bad_agents_missing.md');
    execFile('node', ['-r', 'ts-node/register', cli, file], (error, stdout, stderr) => {
      expect(error).to.be.an('Error');
      expect(stderr).to.contain('Pressure drop');
      done();
    });
  });
});

