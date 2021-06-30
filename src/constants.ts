// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

export namespace Context {
    export const EXTENSION_ACTIVATED: string = "java:projectManagerActivated";
    export const SUPPORTED_BUILD_FILES: string = "java:supportedBuildFiles";
    export const NO_JAVA_PEOJECT: string = "java:noJavaProjects";
}

export namespace Explorer {
    export enum ContextValueType {
        WorkspaceFolder = "workspaceFolder",
        Project = "project",
        Container = "container",
        PackageRoot = "packageRoot",
        Package = "package",
        Jar = "jar",
        File = "file",
        Type = "type",
        Folder = "folder",
    }
}

export namespace Build {
    export const FILE_NAMES: string[] = ["pom.xml", "build.gradle"];
}

export namespace ExtensionName {
    export const JAVA_LANGUAGE_SUPPORT: string = "redhat.java";
}
