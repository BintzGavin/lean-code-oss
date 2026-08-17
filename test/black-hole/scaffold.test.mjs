import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

const repo = new URL('../../', import.meta.url);

const roles = [
	'base',
	'editor',
	'platform',
	'runtime',
	'workbench-api',
	'workbench-shell',
	'workbench-services',
	'workbench-features',
	'extensions',
	'build-distribution',
	'quality',
	'documentation',
];

async function text(path) {
	return readFile(new URL(path, repo), 'utf8');
}

test('the repository has one measurable lean-editor vision', async () => {
	const vision = await text('VISION.md');
	assert.match(vision, /Code - OSS 1\.133\.0/);
	assert.match(vision, /Code - OSS 1\.10\.2/);
	assert.match(vision, /idle private memory/i);
	assert.match(vision, /VSIX/i);
	assert.match(vision, /AI|chat|agent/i);
	assert.match(vision, /Apple Silicon/i);
});

test('the gravity map defines twelve disjoint write surfaces', async () => {
	const roleMap = await text('.sys/black-hole/role-map.md');
	const contract = roleMap.match(/```json ownership-contract\n([\s\S]+?)\n```/);
	assert.ok(contract, 'role map must contain a machine-checkable ownership contract');

	const parsed = JSON.parse(contract[1]);
	assert.deepEqual(parsed.roles.map(role => role.id), roles);

	const owned = parsed.roles.flatMap(role => role.productPaths.map(path => ({ role: role.id, path: path.replace(/\/$/, '') })));
	for (let left = 0; left < owned.length; left++) {
		for (let right = left + 1; right < owned.length; right++) {
			const a = owned[left];
			const b = owned[right];
			assert.ok(
				!(a.path === b.path || a.path.startsWith(`${b.path}/`) || b.path.startsWith(`${a.path}/`)),
				`ownership overlap: ${a.role}:${a.path} and ${b.role}:${b.path}`,
			);
		}
	}
});

test('every role has isolated plans, backlog, memory, status, and prompts', async () => {
	for (const role of roles) {
		await text(`.sys/backlogs/${role}.md`);
		await text(`.sys/memory/${role}.md`);
		await text(`.sys/plans/${role}/README.md`);
		await text(`docs/status/${role.toUpperCase()}.md`);

		const planner = await text(`docs/prompts/planning-${role}.md`);
		assert.match(planner, /PLANNER/);
		assert.match(planner, /VISION\.md/);
		assert.match(planner, new RegExp(`\\.sys/backlogs/${role}\\.md`));
		assert.match(planner, /Do not modify product files/i);

		const executor = await text(`docs/prompts/execution-${role}.md`);
		assert.match(executor, /EXECUTOR/);
		assert.match(executor, /ready.*in_progress/is);
		assert.match(executor, new RegExp(`\\.sys/backlogs/${role}\\.md`));
		assert.match(executor, /completed|blocked|needs_input/);
	}
});

test('Jules cadence stays below the 100-task daily limit with recovery headroom', async () => {
	const schedule = JSON.parse(await text('.sys/black-hole/jules-schedules.json'));
	assert.deepEqual(schedule.roles, roles);
	assert.deepEqual(schedule.planningHours, [0, 8, 16]);
	assert.deepEqual(schedule.executionHours, [1, 9, 17]);
	assert.equal(schedule.timezone, 'America/Chicago');
	assert.equal(schedule.dailyTaskLimit, 100);
	assert.equal(schedule.scheduledTasksPerDay, 73);
	assert.equal(schedule.reservedTasksPerDay, 27);
	assert.equal(schedule.releaseGate.cadence, 'daily');
	assert.equal(schedule.releaseGate.prompt, 'Read docs/prompts/release-gate.md and follow it exactly.');
	await text('docs/prompts/release-gate.md');
});

test('licensing keeps the downstream ELv2 choice and upstream MIT notice', async () => {
	assert.match(await text('LICENSE'), /Elastic License 2\.0/);
	assert.match(await text('UPSTREAM_LICENSE.txt'), /MIT License/);
	assert.match(await text('NOTICE.md'), /microsoft\/vscode/i);
});

test('the Helios auto-merge workflow is mirrored byte-for-byte', async () => {
	const workflow = await readFile(new URL('.github/workflows/auto-merge.yml', repo));
	const digest = createHash('sha256').update(workflow).digest('hex');
	assert.equal(digest, 'd6cdb308c748c296f587d1a1284bf14d89bf0e505d4f0e6d69b8ec0ce10f85d1');
	assert.match(await text('.gitattributes'), /^docs\/PROGRESS\.md merge=union$/m);
});

test('manual validation and upstream provenance are explicit', async () => {
	assert.match(await text('docs/MANUAL-VALIDATION.md'), /Jules/i);
	assert.match(await text('UPSTREAM.md'), /a5b500951314efd502d07465bd138dfbd714a960/);
	assert.match(await text('UPSTREAM.md'), /8076a19fdcab7e1fc1707952d652f0bb6c6db331/);
});
