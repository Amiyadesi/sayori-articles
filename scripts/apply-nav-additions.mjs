#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const today = new Date().toISOString().slice(0, 10);

for (const lang of ["zh", "en"]) {
	const navFile = path.join(root, "nav", `nav.${lang}.json`);
	const addFile = path.join(root, "nav", `additions.${lang}.json`);
	if (!fs.existsSync(navFile) || !fs.existsSync(addFile)) continue;
	const nav = JSON.parse(fs.readFileSync(navFile, "utf8"));
	const adds = JSON.parse(fs.readFileSync(addFile, "utf8"));
	const urls = new Set();
	for (const cat of nav.categories) {
		for (const entry of cat.entries) urls.add(String(entry.url || "").replace(/\/+$/, "").toLowerCase());
	}
	const cats = Object.fromEntries(nav.categories.map((cat) => [cat.id, cat]));
	let added = 0;
	for (const raw of adds) {
		const cat = cats[raw.category];
		if (!cat) throw new Error(`unknown category ${raw.category}`);
		const key = String(raw.url || "").replace(/\/+$/, "").toLowerCase();
		if (urls.has(key) || cat.entries.some((item) => item.name === raw.name)) continue;
		const { category, ...entry } = raw;
		if (!entry.added) entry.added = today;
		cat.entries.push(entry);
		urls.add(key);
		added += 1;
	}
	if (nav.meta) nav.meta.updated = today;
	fs.writeFileSync(navFile, `${JSON.stringify(nav, null, "\t")}\n`);
	console.log(`[apply-nav-additions] ${lang}: added ${added}`);
}
