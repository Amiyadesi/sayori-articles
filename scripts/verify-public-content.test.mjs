import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const sourceScript = fileURLToPath(
	new URL("./verify-public-content.mjs", import.meta.url),
);
const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "public-content-verify-"));

try {
	const root = path.join(tmpRoot, "sayori-articles");
	const scriptPath = path.join(root, "scripts", "verify-public-content.mjs");
	write(scriptPath, fs.readFileSync(sourceScript, "utf8"));
	createValidFixture(root);

	const valid = run(scriptPath);
	assert.equal(valid.status, 0, valid.stderr || valid.stdout);

	fs.rmSync(path.join(root, "anime", "assets", "watching", "cover.webp"));
	const missingCover = run(scriptPath);
	assert.equal(missingCover.status, 1);
	assert.match(missingCover.stderr, /missing local asset: anime\/assets\/watching\/cover\.webp/);
	write(path.join(root, "anime", "assets", "watching", "cover.webp"), "asset");

	fs.rmSync(path.join(root, "home"), { recursive: true, force: true });
	const missingDirectory = run(scriptPath);
	assert.equal(missingDirectory.status, 1);
	assert.match(missingDirectory.stderr, /required directory missing: home/);
	createValidFixture(root);

	const missingFrontmatterPath = path.join(root, "posts", "missing-frontmatter.md");
	write(missingFrontmatterPath, "Published without metadata.\n");
	const missingFrontmatter = run(scriptPath);
	assert.equal(missingFrontmatter.status, 1);
	assert.match(missingFrontmatter.stderr, /content requires frontmatter: posts\/missing-frontmatter\.md/);
	fs.rmSync(missingFrontmatterPath);

	const duplicateSlugPath = path.join(root, "posts", "bom-post.md");
	write(duplicateSlugPath, "---\ntitle: Duplicate Slug\ndraft: false\n---\n");
	const duplicateSlug = run(scriptPath);
	assert.equal(duplicateSlug.status, 1);
	assert.match(duplicateSlug.stderr, /duplicate public slug bom-post/);
} finally {
	fs.rmSync(tmpRoot, { recursive: true, force: true });
}

function createValidFixture(root) {
	for (const directory of [
		"posts", "essays", "friends", "home", "site", "anime/watching",
		"anime/completed", "anime/planned", "anime/assets/watching", "anime/assets/completed",
		"anime/assets/planned", "assets/profile",
		"assets/banner/desktop", "assets/banner/mobile", "assets/music/cover", "assets/sponsor",
	]) {
		fs.mkdirSync(path.join(root, directory), { recursive: true });
	}

	writeJson(path.join(root, "home", "surface.zh.json"), {
		meta: {}, surface: {}, profile: {}, services: {}, external: "https://example.invalid/",
	});
	writeJson(path.join(root, "home", "surface.en.json"), {
		meta: {}, surface: {}, profile: {}, services: {},
	});
	writeJson(path.join(root, "home", "truth.zh.json"), {
		responses: {}, eggs: {}, fallback: [], greeting: "hello",
	});
	writeJson(path.join(root, "home", "truth.en.json"), {
		responses: {}, eggs: {}, fallback: [], greeting: "hello",
	});

	writeJson(path.join(root, "site", "profile.json"), {
		name: "Test", avatar: "avatar.webp", links: [{ url: "https://example.invalid/" }],
	});
	writeJson(path.join(root, "site", "banner.json"), {
		desktop: ["1.webp"], mobile: ["1.webp"],
	});
	writeJson(path.join(root, "site", "navigation.json"), { links: [] });
	writeJson(path.join(root, "site", "announcement.json"), {});
	writeJson(path.join(root, "site", "sponsor.json"), { supporters: [] });
	writeJson(path.join(root, "site", "music.json"), {
		tracks: [{ title: "Song", cover: "cover/song.webp" }],
	});
	write(path.join(root, "site", "sponsor.md"), "---\ntitle: Sponsor\n---\n");

	write(path.join(root, "assets", "profile", "avatar.webp"), "asset");
	write(path.join(root, "assets", "banner", "desktop", "1.webp"), "asset");
	write(path.join(root, "assets", "banner", "mobile", "1.webp"), "asset");
	write(path.join(root, "assets", "music", "cover", "song.webp"), "asset");
	write(path.join(root, "assets", "sponsor", "code.png"), "asset");
	write(path.join(root, "anime", "assets", "watching", "cover.webp"), "asset");
	write(
		path.join(root, "anime", "watching", "show.md"),
		"---\ntitle: Show\nstatus: watching\ncover: cover.webp\n---\n",
	);
	write(
		path.join(root, "posts", "bom-post", "bom-post.md"),
		"\uFEFF---\ntitle: BOM Post\ndraft: false\n---\n\nPublished.\n",
	);
}

function run(scriptPath) {
	return spawnSync(process.execPath, [scriptPath], { encoding: "utf8" });
}

function writeJson(filePath, value) {
	write(filePath, `${JSON.stringify(value)}\n`);
}

function write(filePath, value) {
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
	fs.writeFileSync(filePath, value, "utf8");
}
