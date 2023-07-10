"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.createPrintfulAcountClient = exports.PrintfulAcountClient = void 0;
var axios = require('axios');
var PrintfulAcountClient = /** @class */ (function () {
    function PrintfulAcountClient(auth) {
        this.origin = "https://api.printful.com";
        this.auth = auth;
        this.headers = { Authorization: "Bearer " + this.auth };
    }
    /**
     * Returns list of Products available in the Printful
     *
     * @returns {promise} {products, error}
     * */
    PrintfulAcountClient.prototype.getProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.origin + "/products";
                        return [4 /*yield*/, axios.get(url)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.data];
                    case 2:
                        data = _a.sent();
                        if (data.code >= 400) {
                            return [2 /*return*/, { products: [], error: data.error.message }];
                        }
                        console.log(data);
                        return [2 /*return*/, { products: data.results, error: "" }];
                }
            });
        });
    };
    /**
     * Returns information about a specific product and a list of variants for this product.
     *
     * @param {int} id - Product ID.
     *
     * @returns {promise} {product, variants, error}
    */
    PrintfulAcountClient.prototype.getProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data, _a, product, variants;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = this.origin + "/products" + id;
                        return [4 /*yield*/, axios.get(url)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response.data];
                    case 2:
                        data = _b.sent();
                        if (data.code >= 400) {
                            return [2 /*return*/, { product: {}, variants: [], error: data.error.message }];
                        }
                        _a = data.result, product = _a.product, variants = _a.variants;
                        // console.log(product,variants);
                        return [2 /*return*/, { product: product, variants: variants, error: "" }];
                }
            });
        });
    };
    /**
     * Returns information about a specific Variant and its Product
     * @param {int} id - Product ID.
     *
     * @returns {promise} {product, variant, error}
     * */
    PrintfulAcountClient.prototype.getVariant = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data, _a, product, variant;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = this.origin + "/products/variant/" + id;
                        return [4 /*yield*/, axios.get(url)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response.data];
                    case 2:
                        data = _b.sent();
                        if (data.code >= 400) {
                            return [2 /*return*/, { product: {}, variant: {}, error: data.error.message }];
                        }
                        _a = data.result, product = _a.product, variant = _a.variant;
                        // console.log(product,variant);
                        return [2 /*return*/, { product: product, variant: variant, error: "" }];
                }
            });
        });
    };
    /**
     * Returns information about the size guide for a specific product.
     * @param {int} id - Product ID.
     * @param {boolean} [metric=true] - set true to return sizes in cm as opposed to inches (optional)
     *
     * @returns {promise} {product_id, available_sizes, size_tables, error}
     * */
    PrintfulAcountClient.prototype.getSize = function (id, metric) {
        if (metric === void 0) { metric = false; }
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data, _a, product_id, available_sizes, size_tables;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = this.origin + "/products/" + id + "/sizes?unit=" + (metric ? "cm" : "inches");
                        return [4 /*yield*/, axios.get(url)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response.data];
                    case 2:
                        data = _b.sent();
                        if (data.code >= 400) {
                            return [2 /*return*/, { product_id: -1, available_sizes: [], size_tables: [], error: data.error.message }];
                        }
                        return [4 /*yield*/, data.result];
                    case 3:
                        _a = _b.sent(), product_id = _a.product_id, available_sizes = _a.available_sizes, size_tables = _a.size_tables;
                        console.log(product_id, available_sizes, size_tables);
                        return [2 /*return*/, { product_id: product_id, available_sizes: available_sizes, size_tables: size_tables, error: "" }];
                }
            });
        });
    };
    /**
     * Returns information about a specific category.
     * @param {int} id - Category ID
     *
     * @returns {promise} {category, error}
     * */
    PrintfulAcountClient.prototype.getCategory = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data, category;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.origin + "/categories/" + id;
                        return [4 /*yield*/, axios.get(url)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.data];
                    case 2:
                        data = _a.sent();
                        if (data.code >= 400) {
                            return [2 /*return*/, { category: {}, error: data.error.message }];
                        }
                        return [4 /*yield*/, data.result];
                    case 3:
                        category = (_a.sent()).category;
                        // console.log(category);
                        return [2 /*return*/, { category: category, error: "" }];
                }
            });
        });
    };
    /**
     * Returns a list of Sync Product objects from your custom Printful store.
     *
     * Params:
     * @param {int} [offset=0] - Offset for Paging
     * @param {int} [limit=20] - Limit items for Paging
     * ----------------------------------------------------------------
     * Optional Params:
     * @param {string} [category_id] - (Optional) A comma-separated list of Category IDs of the Products that are to be returned
     *
     * @returns {promise} {products, paging, error}
     */
    PrintfulAcountClient.prototype.getSyncProducts = function (offset, limit, category_id) {
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = 20; }
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data, _a, products, paging;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = this.origin + "/store/products?" + "offset=" + offset + "&limit=" + limit + (category_id ? "&category_id=" + category_id : "");
                        return [4 /*yield*/, axios.get(url, { headers: this.headers })];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response.data];
                    case 2:
                        data = _b.sent();
                        if (data.code >= 400) {
                            return [2 /*return*/, { products: [], paging: {}, error: data.error.message }];
                        }
                        return [4 /*yield*/, data];
                    case 3:
                        _a = _b.sent(), products = _a.result, paging = _a.paging;
                        // console.log(products);
                        return [2 /*return*/, { products: products, paging: paging, error: "" }];
                }
            });
        });
    };
    /**
     * Creates a new Sync Product together with its Sync Variants. See Examples: {@link https://developers.printful.com/docs/?_gl=1*1sbmfdi*_ga*NDMzMTM2Mjk0LjE2ODcyMzU3MDc.*_ga_EZ4XVRL864*MTY4ODc3OTM1NC4xMi4xLjE2ODg3ODEwMzYuMTAuMC4w#section/Products-API-examples/Create-a-new-Sync-Product Link}
     *
     * Params:
     * @param {SyncProduct} sync_product - Information about the SyncProduct
     * @param {[SyncVariant]} sync_variants - Information about the Sync Variants
     *
     * @returns {promise} {product, error}
     */
    PrintfulAcountClient.prototype.createSyncProduct = function (sync_product, sync_variants) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data, product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.origin + "/store/products";
                        return [4 /*yield*/, axios.post(url, { sync_product: sync_product, sync_variants: sync_variants }, { headers: this.headers })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.data];
                    case 2:
                        data = _a.sent();
                        if (data.code >= 400) {
                            return [2 /*return*/, { product: {}, error: data.error.message }];
                        }
                        return [4 /*yield*/, data];
                    case 3:
                        product = (_a.sent()).result;
                        // console.log(product);
                        return [2 /*return*/, { product: product, error: "" }];
                }
            });
        });
    };
    /**
     * Get information about a single Sync Product and its Sync Variants.
     * @param {int|string} id - Sync Product ID (integer) or External ID (if prefixed with @)
     *
     * @returns {promise} {sync_product, sync_variants, error}
     */
    PrintfulAcountClient.prototype.getSyncProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data, _a, sync_product, sync_variants;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = this.origin + "/store/products/" + id;
                        return [4 /*yield*/, axios.get(url, { headers: this.headers })];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response.data];
                    case 2:
                        data = _b.sent();
                        if (data.code >= 400) {
                            return [2 /*return*/, { sync_product: {}, sync_variants: [], error: data.error.message }];
                        }
                        return [4 /*yield*/, data.result];
                    case 3:
                        _a = _b.sent(), sync_product = _a.sync_product, sync_variants = _a.sync_variants;
                        // console.log(sync_product, sync_variants);
                        return [2 /*return*/, { sync_product: sync_product, sync_variants: sync_variants, error: "" }];
                }
            });
        });
    };
    /**
     * Deletes a Sync Product with all of its Sync Variants
     * @param {int|string} id - Sync Product ID (integer) or External ID (if prefixed with @)
     *
     * @returns {promise} {sync_product, sync_variants, error}
     */
    PrintfulAcountClient.prototype.deleteSyncProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data, _a, sync_product, sync_variants;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = this.origin + "/store/products/" + id;
                        return [4 /*yield*/, axios.delete(url, { headers: this.headers })];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response.data];
                    case 2:
                        data = _b.sent();
                        if (data.code >= 400) {
                            return [2 /*return*/, { sync_product: {}, sync_variants: [], error: data.error.message }];
                        }
                        return [4 /*yield*/, data.result];
                    case 3:
                        _a = _b.sent(), sync_product = _a.sync_product, sync_variants = _a.sync_variants;
                        // console.log(sync_product, sync_variants);
                        return [2 /*return*/, { sync_product: sync_product, sync_variants: sync_variants, error: "" }];
                }
            });
        });
    };
    PrintfulAcountClient.prototype.modifySyncProduct = function (id, sync_product, sync_variants) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data, product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.origin + "/store/products/" + id;
                        return [4 /*yield*/, axios.post(url, { sync_product: sync_product, sync_variants: sync_variants }, { headers: this.headers })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.data];
                    case 2:
                        data = _a.sent();
                        if (data.code >= 400) {
                            return [2 /*return*/, { product: {}, error: data.error.message }];
                        }
                        return [4 /*yield*/, data];
                    case 3:
                        product = (_a.sent()).result;
                        // console.log(product);
                        return [2 /*return*/, { product: product, error: "" }];
                }
            });
        });
    };
    PrintfulAcountClient.prototype.test = function () {
        console.log("Printful Client works!");
    };
    return PrintfulAcountClient;
}());
exports.PrintfulAcountClient = PrintfulAcountClient;
function createPrintfulAcountClient(auth) {
    return new PrintfulAcountClient(auth);
}
exports.createPrintfulAcountClient = createPrintfulAcountClient;
