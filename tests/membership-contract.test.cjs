const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const facts = require('../membership-facts.json');
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const text = value => value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

test('onboarding presents Free and the three approved paid tiers', () => {
  const names = [...html.matchAll(/class="tier-name display">([^<]+)</g)].map(m => m[1]);
  assert.deepEqual(names, ['Free', ...facts.paidTierNames]);
  assert.doesNotMatch(html, /Inner Circle|29158293|qualifying tiers|qualifying paid tiers/i);
  const table = html.match(/<table class="matrix">([\s\S]*?)<\/table>/)[1];
  for (const match of table.matchAll(/<tr>([\s\S]*?)<\/tr>/g)) {
    assert.equal((match[1].match(/<(?:th|td)\b/g) || []).length, 5);
  }
  const rows = new Map([...table.matchAll(/<tr><th>(.*?)<\/th>(.*?)<\/tr>/g)]
    .map(m => [text(m[1]), [...m[2].matchAll(/<td[^>]*>(.*?)<\/td>/g)].map(c => text(c[1]))]));
  assert.deepEqual(rows.get('Ask Erik channel'), ['—', '✓', '✓', '✓']);
  assert.deepEqual(rows.get('Interactive Zoom workshops'), ['—', '—', '2 / month', '2 / month']);
  assert.match(html, /Everything in Pro \+ Pro Plus/);
});

test('access instructions and member management links remain available', () => {
  assert.match(html, /Free members do not need to connect Patreon to Discord/);
  assert.match(html, /Settings → Connected Apps/);
  assert.match(html, /Coaching Intro/);
  assert.match(html, /https:\/\/www\.patreon\.com\/cw\/OutlierTrading\/membership/);
  assert.doesNotMatch(html, /https:\/\/www\.outliertrading\.io\/(?:tier-comparison|outlier-pro)(?=["/#?\s]|$)/);
});

test('peer membership manifest matches when supplied', { skip: !process.env.MEMBERSHIP_PEER_ROOT }, () => {
  const peer = JSON.parse(fs.readFileSync(path.join(process.env.MEMBERSHIP_PEER_ROOT, 'membership-facts.json'), 'utf8'));
  assert.deepEqual(peer, facts);
});
