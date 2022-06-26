"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs-extra"));
var path = __importStar(require("path"));
var packageJsonPath = path.join(__dirname, '..', 'package.json');
var buildPath = path.join(__dirname, '..', 'build');
var uiPackagePath = path.join(__dirname, '..', 'package');
var indexJsPath = path.join(uiPackagePath, 'index.js');
var indexDtsPath = path.join(uiPackagePath, 'index.d.ts');
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var ex_1, ex_2, e_1, packageJsonObj, name_1, version, description, keywords, author, repository, license, publishConfig, newPackageJson, newPackageJsonFilePath, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Verifying ".concat(indexJsPath, " exists"));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fs.ensureFile(indexJsPath)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    ex_1 = _a.sent();
                    throw new Error("".concat(indexJsPath, " did not exist."));
                case 4:
                    console.log("Verifying ".concat(indexDtsPath, " exists"));
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, fs.ensureFile(indexDtsPath)];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    ex_2 = _a.sent();
                    throw new Error("".concat(indexDtsPath, " did not exist."));
                case 8:
                    console.log("Copy: ".concat(buildPath, " to ").concat(uiPackagePath));
                    _a.label = 9;
                case 9:
                    _a.trys.push([9, 12, , 13]);
                    return [4 /*yield*/, fs.ensureDir(buildPath)];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, fs.copy(buildPath, uiPackagePath)];
                case 11:
                    _a.sent();
                    return [3 /*break*/, 13];
                case 12:
                    e_1 = _a.sent();
                    throw e_1;
                case 13:
                    console.log("Reading package.json from: ".concat(packageJsonPath));
                    _a.label = 14;
                case 14:
                    _a.trys.push([14, 17, , 18]);
                    return [4 /*yield*/, fs.readJson(packageJsonPath)];
                case 15:
                    packageJsonObj = _a.sent();
                    name_1 = packageJsonObj.name, version = packageJsonObj.version, description = packageJsonObj.description, keywords = packageJsonObj.keywords, author = packageJsonObj.author, repository = packageJsonObj.repository, license = packageJsonObj.license, publishConfig = packageJsonObj.publishConfig;
                    console.log("Found name: ".concat(name_1, " version: ").concat(version));
                    newPackageJson = {
                        name: name_1,
                        version: version,
                        description: description,
                        keywords: keywords,
                        author: author,
                        repository: repository,
                        license: license,
                        main: 'index.js',
                        typings: 'index.d.ts',
                        publishConfig: publishConfig,
                    };
                    newPackageJsonFilePath = path.join(uiPackagePath, 'package.json');
                    console.log("Writing new package.json to ".concat(newPackageJsonFilePath));
                    return [4 /*yield*/, fs.writeJson(newPackageJsonFilePath, newPackageJson, {
                            spaces: '  ',
                        })];
                case 16:
                    _a.sent();
                    return [3 /*break*/, 18];
                case 17:
                    e_2 = _a.sent();
                    throw e_2;
                case 18: return [2 /*return*/];
            }
        });
    });
}
main();
process.on('unhandledRejection', function (e) {
    throw e;
});
