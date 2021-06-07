// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as cp from "child_process";
import { platform } from "os";
import * as path from "path";
import { ExTester } from "vscode-extension-tester";
import { downloadAndUnzipVSCode, resolveCliPathFromVSCodeExecutablePath, runTests } from "vscode-test";

async function main(): Promise<void> {
    try {
        const vscodeExecutablePath = await downloadAndUnzipVSCode();
        const cliPath = resolveCliPathFromVSCodeExecutablePath(vscodeExecutablePath);

        // Resolve redhat.java dependency
        cp.spawnSync(cliPath, ["--install-extension", "redhat.java"], {
            encoding: "utf-8",
            stdio: "inherit",
        });

        // The folder containing the Extension Manifest package.json
        // Passed to `--extensionDevelopmentPath`
        const extensionDevelopmentPath: string = path.resolve(__dirname, "../../");

        // Download VS Code, unzip it and run the integration test

        // Run general test
        await runTests({
            vscodeExecutablePath,
            extensionDevelopmentPath,
            extensionTestsPath: path.resolve(__dirname, "./suite"),
            launchArgs: [
                path.join(__dirname, "..", "..", "test", "java9"),
            ],
        });

        // Run test for simple project
        await runTests({
            vscodeExecutablePath,
            extensionDevelopmentPath,
            extensionTestsPath: path.resolve(__dirname, "./simple-suite"),
            launchArgs: [
                path.join(__dirname, "..", "..", "test", "simple"),
            ],
        });

        // Run test for maven project
        await runTests({
            vscodeExecutablePath,
            extensionDevelopmentPath,
            extensionTestsPath: path.resolve(__dirname, "./maven-suite"),
            launchArgs: [
                path.join(__dirname, "..", "..", "test", "maven"),
            ],
        });

        // Run test for gradle project
        await runTests({
            vscodeExecutablePath,
            extensionDevelopmentPath,
            extensionTestsPath: path.resolve(__dirname, "./gradle-suite"),
            launchArgs: [
                path.join(__dirname, "..", "..", "test", "gradle"),
            ],
        });

        // Run test for invisible project
        await runTests({
            vscodeExecutablePath,
            extensionDevelopmentPath,
            extensionTestsPath: path.resolve(__dirname, "./invisible-suite"),
            launchArgs: [
                path.join(__dirname, "..", "..", "test", "invisible"),
            ],
        });

        if (platform() === "darwin") {
            // The current UI test framework doesn't support mac title bar and context menus.
            // See: https://github.com/redhat-developer/vscode-extension-tester#requirements
            // So we dismiss UI tests in mac.
            process.exit(0);
        } else {
            // Run UI command tests
            const extester = new ExTester();
            const testPath = path.join(__dirname, "command", "command.test.js");
            process.exit(await extester.setupAndRunTests(testPath, "1.57.0"));
        }
    } catch (err) {
        process.exit(1);
    }
}

main();
