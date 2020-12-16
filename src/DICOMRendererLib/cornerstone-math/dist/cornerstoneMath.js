/*! cornerstone-math - 0.1.9 - 2020-10-01 | (c) 2017 Chris Hafey | https://github.com/cornerstonejs/cornerstoneMath */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("cornerstone-math", [], factory);
	else if(typeof exports === 'object')
		exports["cornerstone-math"] = factory();
	else
		root["cornerstoneMath"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "a93104d9ec79cc46b114";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "cornerstoneMath";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./index.js")(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Line3.js":
/*!******************!*\
  !*** ./Line3.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vector = __webpack_require__(/*! ./vector3.js */ "./vector3.js");

var _vector2 = _interopRequireDefault(_vector);

var _math = __webpack_require__(/*! ./math.js */ "./math.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Copied from THREE.JS
/**
 * @author bhouston / http://exocortex.com
 */

var Line3 = function () {
  function Line3(start, end) {
    _classCallCheck(this, Line3);

    this.start = start !== undefined ? start : new _vector2.default();
    this.end = end !== undefined ? end : new _vector2.default();
  }

  _createClass(Line3, [{
    key: 'set',
    value: function set(start, end) {

      this.start.copy(start);
      this.end.copy(end);

      return this;
    }
  }, {
    key: 'copy',
    value: function copy(line) {

      this.start.copy(line.start);
      this.end.copy(line.end);

      return this;
    }
  }, {
    key: 'center',
    value: function center(optionalTarget) {

      var result = optionalTarget || new _vector2.default();

      return result.addVectors(this.start, this.end).multiplyScalar(0.5);
    }
  }, {
    key: 'delta',
    value: function delta(optionalTarget) {

      var result = optionalTarget || new _vector2.default();

      return result.subVectors(this.end, this.start);
    }
  }, {
    key: 'distanceSq',
    value: function distanceSq() {

      return this.start.distanceToSquared(this.end);
    }
  }, {
    key: 'distance',
    value: function distance() {

      return this.start.distanceTo(this.end);
    }
  }, {
    key: 'at',
    value: function at(t, optionalTarget) {

      var result = optionalTarget || new _vector2.default();

      return this.delta(result).multiplyScalar(t).add(this.start);
    }
  }, {
    key: 'closestPointToPointParameter',
    value: function closestPointToPointParameter(point, clampToLine) {

      var startP = new _vector2.default();
      var startEnd = new _vector2.default();

      startP.subVectors(point, this.start);
      startEnd.subVectors(this.end, this.start);

      var startEnd2 = startEnd.dot(startEnd);
      var startEnd_startP = startEnd.dot(startP);

      var t = startEnd_startP / startEnd2;

      if (clampToLine) {
        t = (0, _math.clamp)(t, 0, 1);
      }

      return t;
    }
  }, {
    key: 'closestPointToPoint',
    value: function closestPointToPoint(point, clampToLine, optionalTarget) {

      var t = this.closestPointToPointParameter(point, clampToLine);

      var result = optionalTarget || new _vector2.default();

      return this.delta(result).multiplyScalar(t).add(this.start);
    }
  }, {
    key: 'applyMatrix4',
    value: function applyMatrix4(matrix) {

      this.start.applyMatrix4(matrix);
      this.end.applyMatrix4(matrix);

      return this;
    }
  }, {
    key: 'equals',
    value: function equals(line) {

      return line.start.equals(this.start) && line.end.equals(this.end);
    }
  }, {
    key: 'clone',
    value: function clone() {

      return new Line3().copy(this);
    }
  }, {
    key: 'intersectLine',
    value: function intersectLine(line) {
      // http://stackoverflow.com/questions/2316490/the-algorithm-to-find-the-point-of-intersection-of-two-3d-line-segment/10288710#10288710
      // Consider two lines r1 and r2, represented by the following parametric equations:A + vt and B + us, respectively.
      // Where A is a point of r1 and v a vector parallel to line.
      // And B is a point of r2 and u a vector parallel to line.
      // 'this' represents r2 and 'line' represents r1
      var da = this.end.clone().sub(this.start); //u
      var db = line.end.clone().sub(line.start); //v
      var dc = line.start.clone().sub(this.start); // AB

      var daCrossDb = da.clone().cross(db);
      var dcCrossDb = dc.clone().cross(db);

      // Lines are not coplanar, stop here
      // Coplanar only if the vectors AB, u, v are linearly dependent, i.e AB . (u × v) = 0
      var coplanarResult = dc.dot(daCrossDb);
      if (!(0, _math.approximatelyEquals)(coplanarResult, 0)) {
        return;
      }

      var s = dcCrossDb.dot(daCrossDb) / daCrossDb.lengthSq();

      // Make sure we have an intersection
      if (s > 1.0 || isNaN(s)) {
        return;
      }

      var intersection = this.start.clone().add(da.clone().multiplyScalar(s));
      var distanceTest = intersection.clone().sub(line.start).lengthSq() + intersection.clone().sub(line.end).lengthSq();

      if (distanceTest <= line.distanceSq()) {
        return intersection;
      }

      return;
    }
  }]);

  return Line3;
}();

exports.default = Line3;

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vector3 = exports.rect = exports.quaternion = exports.point = exports.Plane = exports.Matrix4 = exports.sign = exports.radToDeg = exports.degToRad = exports.clamp = exports.lineSegment = exports.Line3 = undefined;

var _Line = __webpack_require__(/*! ./Line3.js */ "./Line3.js");

var _Line2 = _interopRequireDefault(_Line);

var _lineSegment = __webpack_require__(/*! ./lineSegment.js */ "./lineSegment.js");

var _lineSegment2 = _interopRequireDefault(_lineSegment);

var _math = __webpack_require__(/*! ./math.js */ "./math.js");

var _matrix = __webpack_require__(/*! ./matrix4.js */ "./matrix4.js");

var _matrix2 = _interopRequireDefault(_matrix);

var _plane = __webpack_require__(/*! ./plane.js */ "./plane.js");

var _plane2 = _interopRequireDefault(_plane);

var _point = __webpack_require__(/*! ./point.js */ "./point.js");

var _point2 = _interopRequireDefault(_point);

var _quaternion = __webpack_require__(/*! ./quaternion.js */ "./quaternion.js");

var _quaternion2 = _interopRequireDefault(_quaternion);

var _rect = __webpack_require__(/*! ./rect.js */ "./rect.js");

var _rect2 = _interopRequireDefault(_rect);

var _vector = __webpack_require__(/*! ./vector3.js */ "./vector3.js");

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cornerstoneMath = {
  Line3: _Line2.default,
  lineSegment: _lineSegment2.default,
  clamp: _math.clamp,
  degToRad: _math.degToRad,
  radToDeg: _math.radToDeg,
  sign: _math.sign,
  Matrix4: _matrix2.default,
  Plane: _plane2.default,
  point: _point2.default,
  quaternion: _quaternion2.default,
  rect: _rect2.default,
  Vector3: _vector2.default
};

exports.Line3 = _Line2.default;
exports.lineSegment = _lineSegment2.default;
exports.clamp = _math.clamp;
exports.degToRad = _math.degToRad;
exports.radToDeg = _math.radToDeg;
exports.sign = _math.sign;
exports.Matrix4 = _matrix2.default;
exports.Plane = _plane2.default;
exports.point = _point2.default;
exports.quaternion = _quaternion2.default;
exports.rect = _rect2.default;
exports.Vector3 = _vector2.default;
exports.default = cornerstoneMath;

/***/ }),

/***/ "./lineSegment.js":
/*!************************!*\
  !*** ./lineSegment.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _math = __webpack_require__(/*! ./math.js */ "./math.js");

// Based on  http://stackoverflow.com/questions/849211/shortest-distance-between-a-point-and-a-line-segment
function sqr(x) {
  return x * x;
}

function dist2(v, w) {
  return sqr(v.x - w.x) + sqr(v.y - w.y);
}

function distanceToPointSquared(lineSegment, point) {
  var l2 = dist2(lineSegment.start, lineSegment.end);

  if (l2 === 0) {
    return dist2(point, lineSegment.start);
  }
  var t = ((point.x - lineSegment.start.x) * (lineSegment.end.x - lineSegment.start.x) + (point.y - lineSegment.start.y) * (lineSegment.end.y - lineSegment.start.y)) / l2;

  if (t < 0) {
    return dist2(point, lineSegment.start);
  }
  if (t > 1) {
    return dist2(point, lineSegment.end);
  }

  var pt = {
    x: lineSegment.start.x + t * (lineSegment.end.x - lineSegment.start.x),
    y: lineSegment.start.y + t * (lineSegment.end.y - lineSegment.start.y)
  };

  return dist2(point, pt);
}

function distanceToPoint(lineSegment, point) {
  return Math.sqrt(distanceToPointSquared(lineSegment, point));
}

// Returns intersection points of two lines
function intersectLine(lineSegment1, lineSegment2) {
  var intersectionPoint = {};

  var x1 = lineSegment1.start.x,
      y1 = lineSegment1.start.y,
      x2 = lineSegment1.end.x,
      y2 = lineSegment1.end.y,
      x3 = lineSegment2.start.x,
      y3 = lineSegment2.start.y,
      x4 = lineSegment2.end.x,
      y4 = lineSegment2.end.y;

  // Coefficients of line equations
  var a1 = void 0,
      a2 = void 0,
      b1 = void 0,
      b2 = void 0,
      c1 = void 0,
      c2 = void 0;
  // Sign values
  var r1 = void 0,
      r2 = void 0,
      r3 = void 0,
      r4 = void 0;

  // Intermediate values
  var denom = void 0,
      num = void 0;

  // Compute a1, b1, c1, where line joining points 1 and 2 is "a1 x  +  b1 y  +  c1  =  0"
  a1 = y2 - y1;
  b1 = x1 - x2;
  c1 = x2 * y1 - x1 * y2;

  // Compute r3 and r4
  r3 = a1 * x3 + b1 * y3 + c1;
  r4 = a1 * x4 + b1 * y4 + c1;

  /* Check signs of r3 and r4.  If both point 3 and point 4 lie on
    * same side of line 1, the line segments do not intersect.
    */

  if (r3 !== 0 && r4 !== 0 && (0, _math.sign)(r3) === (0, _math.sign)(r4)) {
    return;
  }

  // Compute a2, b2, c2
  a2 = y4 - y3;
  b2 = x3 - x4;
  c2 = x4 * y3 - x3 * y4;

  // Compute r1 and r2
  r1 = a2 * x1 + b2 * y1 + c2;
  r2 = a2 * x2 + b2 * y2 + c2;

  /* Check signs of r1 and r2.  If both point 1 and point 2 lie
    * on same side of second line segment, the line segments do
    * not intersect.
    */

  if (r1 !== 0 && r2 !== 0 && (0, _math.sign)(r1) === (0, _math.sign)(r2)) {
    return;
  }

  /* Line segments intersect: compute intersection point.
    */

  denom = a1 * b2 - a2 * b1;

  /* The denom/2 is to get rounding instead of truncating.  It
    * is added or subtracted to the numerator, depending upon the
    * sign of the numerator.
    */

  num = b1 * c2 - b2 * c1;
  var x = parseFloat(num / denom);

  num = a2 * c1 - a1 * c2;
  var y = parseFloat(num / denom);

  intersectionPoint.x = x;
  intersectionPoint.y = y;

  return intersectionPoint;
}

// Module exports
var lineSegment = {
  distanceToPoint: distanceToPoint,
  intersectLine: intersectLine
};

exports.default = lineSegment;

/***/ }),

/***/ "./math.js":
/*!*****************!*\
  !*** ./math.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var EPSILON = 0.0001;
// Based on THREE.JS
function clamp(x, a, b) {
  return x < a ? a : x > b ? b : x;
}

function degToRad(degrees) {
  var degreeToRadiansFactor = Math.PI / 180;

  return degrees * degreeToRadiansFactor;
}

function radToDeg(radians) {
  var radianToDegreesFactor = 180 / Math.PI;

  return radians * radianToDegreesFactor;
}

// Returns sign of number
function sign(x) {
  return typeof x === 'number' ? x ? x < 0 ? -1 : 1 : x === x ? 0 : NaN : NaN;
}

/**
 * 
 * Compare if two numbers are equal(if they have approximately the same value). to prevent js float precision issue
 * Adapted from glmatrix
 * @param {number} a
 * @param {number} b
 * @param {number} epsilon Precision to define proximity
 * @return {boolean} check whether or not the arguments have approximately the same value
 * 
 */
function approximatelyEquals(a, b, epsilon) {
  var _epsilon = epsilon || EPSILON;
  return Math.abs(a - b) <= _epsilon * Math.max(1.0, Math.abs(a), Math.abs(b));
}

exports.clamp = clamp;
exports.degToRad = degToRad;
exports.approximatelyEquals = approximatelyEquals;
exports.radToDeg = radToDeg;
exports.sign = sign;

/***/ }),

/***/ "./matrix4.js":
/*!********************!*\
  !*** ./matrix4.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vector = __webpack_require__(/*! ./vector3.js */ "./vector3.js");

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Based on THREE.JS
var Matrix4 = function () {
  function Matrix4(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
    _classCallCheck(this, Matrix4);

    this.elements = new Float32Array(16);

    // TODO: if n11 is undefined, then just set to identity, otherwise copy all other values into matrix
    // We should not support semi specification of Matrix4, it is just weird.

    var te = this.elements;

    te[0] = n11 !== undefined ? n11 : 1;te[4] = n12 || 0;te[8] = n13 || 0;te[12] = n14 || 0;
    te[1] = n21 || 0;te[5] = n22 !== undefined ? n22 : 1;te[9] = n23 || 0;te[13] = n24 || 0;
    te[2] = n31 || 0;te[6] = n32 || 0;te[10] = n33 !== undefined ? n33 : 1;te[14] = n34 || 0;
    te[3] = n41 || 0;te[7] = n42 || 0;te[11] = n43 || 0;te[15] = n44 !== undefined ? n44 : 1;
  }

  _createClass(Matrix4, [{
    key: 'makeRotationFromQuaternion',
    value: function makeRotationFromQuaternion(q) {
      var te = this.elements;

      var x = q.x,
          y = q.y,
          z = q.z,
          w = q.w;
      var x2 = x + x,
          y2 = y + y,
          z2 = z + z;
      var xx = x * x2,
          xy = x * y2,
          xz = x * z2;
      var yy = y * y2,
          yz = y * z2,
          zz = z * z2;
      var wx = w * x2,
          wy = w * y2,
          wz = w * z2;

      te[0] = 1 - (yy + zz);
      te[4] = xy - wz;
      te[8] = xz + wy;

      te[1] = xy + wz;
      te[5] = 1 - (xx + zz);
      te[9] = yz - wx;

      te[2] = xz - wy;
      te[6] = yz + wx;
      te[10] = 1 - (xx + yy);

      // Last column
      te[3] = 0;
      te[7] = 0;
      te[11] = 0;

      // Bottom row
      te[12] = 0;
      te[13] = 0;
      te[14] = 0;
      te[15] = 1;

      return this;
    }
  }, {
    key: 'multiplyMatrices',
    value: function multiplyMatrices(a, b) {
      var ae = a.elements;
      var be = b.elements;
      var te = this.elements;

      var a11 = ae[0],
          a12 = ae[4],
          a13 = ae[8],
          a14 = ae[12];
      var a21 = ae[1],
          a22 = ae[5],
          a23 = ae[9],
          a24 = ae[13];
      var a31 = ae[2],
          a32 = ae[6],
          a33 = ae[10],
          a34 = ae[14];
      var a41 = ae[3],
          a42 = ae[7],
          a43 = ae[11],
          a44 = ae[15];

      var b11 = be[0],
          b12 = be[4],
          b13 = be[8],
          b14 = be[12];
      var b21 = be[1],
          b22 = be[5],
          b23 = be[9],
          b24 = be[13];
      var b31 = be[2],
          b32 = be[6],
          b33 = be[10],
          b34 = be[14];
      var b41 = be[3],
          b42 = be[7],
          b43 = be[11],
          b44 = be[15];

      te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
      te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
      te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
      te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

      te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
      te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
      te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
      te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

      te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
      te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
      te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
      te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

      te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
      te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
      te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
      te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

      return this;
    }
  }, {
    key: 'multiply',
    value: function multiply(m, n) {

      if (n !== undefined) {

        console.warn('DEPRECATED: Matrix4\'s .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.');

        return this.multiplyMatrices(m, n);
      }

      return this.multiplyMatrices(this, m);
    }
  }, {
    key: 'getInverse',
    value: function getInverse(m, throwOnInvertible) {

      // Based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
      var te = this.elements;
      var me = m.elements;

      var n11 = me[0],
          n12 = me[4],
          n13 = me[8],
          n14 = me[12];
      var n21 = me[1],
          n22 = me[5],
          n23 = me[9],
          n24 = me[13];
      var n31 = me[2],
          n32 = me[6],
          n33 = me[10],
          n34 = me[14];
      var n41 = me[3],
          n42 = me[7],
          n43 = me[11],
          n44 = me[15];

      te[0] = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44;
      te[4] = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44;
      te[8] = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44;
      te[12] = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
      te[1] = n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44;
      te[5] = n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44;
      te[9] = n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44;
      te[13] = n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34;
      te[2] = n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44;
      te[6] = n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44;
      te[10] = n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44;
      te[14] = n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34;
      te[3] = n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43;
      te[7] = n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43;
      te[11] = n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43;
      te[15] = n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33;

      var det = n11 * te[0] + n21 * te[4] + n31 * te[8] + n41 * te[12];

      if (det === 0) {

        var msg = 'Matrix4.getInverse(): can\'t invert matrix, determinant is 0';

        if (throwOnInvertible || false) {

          throw new Error(msg);
        } else {

          console.warn(msg);
        }

        this.identity();

        return this;
      }

      this.multiplyScalar(1 / det);

      return this;
    }
  }, {
    key: 'applyToVector3Array',
    value: function applyToVector3Array() {

      var v1 = new _vector2.default();

      return function (array, offset, length) {

        if (offset === undefined) {
          offset = 0;
        }
        if (length === undefined) {
          length = array.length;
        }

        for (var i = 0, j = offset; i < length; i += 3, j += 3) {

          v1.x = array[j];
          v1.y = array[j + 1];
          v1.z = array[j + 2];

          v1.applyMatrix4(this);

          array[j] = v1.x;
          array[j + 1] = v1.y;
          array[j + 2] = v1.z;
        }

        return array;
      };
    }
  }, {
    key: 'makeTranslation',
    value: function makeTranslation(x, y, z) {

      this.set(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);

      return this;
    }
  }, {
    key: 'multiplyScalar',
    value: function multiplyScalar(s) {

      var te = this.elements;

      te[0] *= s;te[4] *= s;te[8] *= s;te[12] *= s;
      te[1] *= s;te[5] *= s;te[9] *= s;te[13] *= s;
      te[2] *= s;te[6] *= s;te[10] *= s;te[14] *= s;
      te[3] *= s;te[7] *= s;te[11] *= s;te[15] *= s;

      return this;
    }
  }, {
    key: 'set',
    value: function set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {

      var te = this.elements;

      te[0] = n11;te[4] = n12;te[8] = n13;te[12] = n14;
      te[1] = n21;te[5] = n22;te[9] = n23;te[13] = n24;
      te[2] = n31;te[6] = n32;te[10] = n33;te[14] = n34;
      te[3] = n41;te[7] = n42;te[11] = n43;te[15] = n44;

      return this;
    }
  }, {
    key: 'makeScale',
    value: function makeScale(x, y, z) {

      this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);

      return this;
    }
  }]);

  return Matrix4;
}();

exports.default = Matrix4;

/***/ }),

/***/ "./plane.js":
/*!******************!*\
  !*** ./plane.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vector = __webpack_require__(/*! ./vector3.js */ "./vector3.js");

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Copied from Three.JS
/**
 * @author bhouston / http://exocortex.com
 */

var Plane = function () {
  function Plane(normal, constant) {
    _classCallCheck(this, Plane);

    this.normal = normal !== undefined ? normal : new _vector2.default(1, 0, 0);
    this.constant = constant !== undefined ? constant : 0;
  }

  _createClass(Plane, [{
    key: 'set',
    value: function set(normal, constant) {

      this.normal.copy(normal);
      this.constant = constant;

      return this;
    }
  }, {
    key: 'setComponents',
    value: function setComponents(x, y, z, w) {

      this.normal.set(x, y, z);
      this.constant = w;

      return this;
    }
  }, {
    key: 'setFromNormalAndCoplanarPoint',
    value: function setFromNormalAndCoplanarPoint(normal, point) {

      this.normal.copy(normal);
      // Must be this.normal, not normal, as this.normal is normalized
      this.constant = -point.dot(this.normal);

      return this;
    }
  }, {
    key: 'copy',
    value: function copy(plane) {

      this.normal.copy(plane.normal);
      this.constant = plane.constant;

      return this;
    }
  }, {
    key: 'normalize',
    value: function normalize() {

      // Note: will lead to a divide by zero if the plane is invalid.

      var inverseNormalLength = 1.0 / this.normal.length();

      this.normal.multiplyScalar(inverseNormalLength);
      this.constant *= inverseNormalLength;

      return this;
    }
  }, {
    key: 'negate',
    value: function negate() {

      this.constant *= -1;
      this.normal.negate();

      return this;
    }
  }, {
    key: 'distanceToPoint',
    value: function distanceToPoint(point) {

      return this.normal.dot(point) + this.constant;
    }
  }, {
    key: 'distanceToSphere',
    value: function distanceToSphere(sphere) {

      return this.distanceToPoint(sphere.center) - sphere.radius;
    }
  }, {
    key: 'projectPoint',
    value: function projectPoint(point, optionalTarget) {

      return this.orthoPoint(point, optionalTarget).sub(point).negate();
    }
  }, {
    key: 'orthoPoint',
    value: function orthoPoint(point, optionalTarget) {

      var perpendicularMagnitude = this.distanceToPoint(point);

      var result = optionalTarget || new _vector2.default();

      return result.copy(this.normal).multiplyScalar(perpendicularMagnitude);
    }
  }, {
    key: 'isIntersectionLine',
    value: function isIntersectionLine(line) {

      // Note: this tests if a line intersects the plane, not whether it (or its end-points) are coplanar with it.

      var startSign = this.distanceToPoint(line.start);
      var endSign = this.distanceToPoint(line.end);

      return startSign < 0 && endSign > 0 || endSign < 0 && startSign > 0;
    }
  }, {
    key: 'intersectPlane',
    value: function intersectPlane(targetPlane) {
      // Returns the intersection line between two planes
      var direction = this.normal.clone().cross(targetPlane.normal);
      var origin = new _vector2.default();
      var intersectionData = {
        origin: origin,
        direction: direction
      };

      // If the planes are parallel, return an empty vector for the intersection line
      if (this.normal.clone().cross(targetPlane.normal).length < 1e-10) {
        intersectionData.direction = new _vector2.default();

        return intersectionData;
      }

      var h1 = this.constant;
      var h2 = targetPlane.constant;
      var n1dotn2 = this.normal.clone().dot(targetPlane.normal);

      var c1 = -(h1 - h2 * n1dotn2) / (1 - n1dotn2 * n1dotn2);
      var c2 = -(h2 - h1 * n1dotn2) / (1 - n1dotn2 * n1dotn2);

      intersectionData.origin = this.normal.clone().multiplyScalar(c1).add(targetPlane.normal.clone().multiplyScalar(c2));

      return intersectionData;
    }
  }, {
    key: 'coplanarPoint',
    value: function coplanarPoint(optionalTarget) {

      var result = optionalTarget || new _vector2.default();

      return result.copy(this.normal).multiplyScalar(-this.constant);
    }
  }, {
    key: 'translate',
    value: function translate(offset) {

      this.constant = this.constant - offset.dot(this.normal);

      return this;
    }
  }, {
    key: 'equals',
    value: function equals(plane) {

      return plane.normal.equals(this.normal) && plane.constant === this.constant;
    }
  }, {
    key: 'clone',
    value: function clone() {

      return new Plane().copy(this);
    }
  }]);

  return Plane;
}();

Plane.prototype.setFromCoplanarPoints = function () {

  var v1 = new _vector2.default();
  var v2 = new _vector2.default();

  return function (a, b, c) {

    var normal = v1.subVectors(c, b).cross(v2.subVectors(a, b)).normalize();

    // Q: should an error be thrown if normal is zero (e.g. degenerate plane)?

    this.setFromNormalAndCoplanarPoint(normal, a);

    return this;
  };
}();

Plane.prototype.intersectLine = function () {

  var v1 = new _vector2.default();

  return function (line, optionalTarget) {

    var result = optionalTarget || new _vector2.default();

    var direction = line.delta(v1);

    var denominator = this.normal.dot(direction);

    if (denominator === 0) {

      // Line is coplanar, return origin
      if (this.distanceToPoint(line.start) === 0) {

        return result.copy(line.start);
      }

      // Unsure if this is the correct method to handle this case.
      return undefined;
    }

    var t = -(line.start.dot(this.normal) + this.constant) / denominator;

    if (t < 0 || t > 1) {

      return undefined;
    }

    return result.copy(direction).multiplyScalar(t).add(line.start);
  };
}();

exports.default = Plane;

/***/ }),

/***/ "./point.js":
/*!******************!*\
  !*** ./point.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function pageToPoint(e) {
  return {
    x: e.pageX,
    y: e.pageY
  };
}

function subtract(lhs, rhs) {
  return {
    x: lhs.x - rhs.x,
    y: lhs.y - rhs.y
  };
}

function copy(point) {
  return {
    x: point.x,
    y: point.y
  };
}

function distance(from, to) {
  return Math.sqrt(distanceSquared(from, to));
}

function distanceSquared(from, to) {
  var delta = subtract(from, to);

  return delta.x * delta.x + delta.y * delta.y;
}

function insideRect(point, rect) {
  if (point.x < rect.left || point.x > rect.left + rect.width || point.y < rect.top || point.y > rect.top + rect.height) {
    return false;
  }

  return true;
}

/**
 * Returns the closest source point to a target point
 * given an array of source points.
 *
 * @param sources An Array of source Points
 * @param target The target Point
 * @returns Point The closest point from the points array
 */
function findClosestPoint(sources, target) {
  var distances = [];
  var minDistance = void 0;

  sources.forEach(function (source, index) {
    var d = distance(source, target);

    distances.push(d);

    if (index === 0) {
      minDistance = d;
    } else {
      minDistance = Math.min(d, minDistance);
    }
  });

  var index = distances.indexOf(minDistance);

  return sources[index];
}

var point = {
  subtract: subtract,
  copy: copy,
  pageToPoint: pageToPoint,
  distance: distance,
  distanceSquared: distanceSquared,
  insideRect: insideRect,
  findClosestPoint: findClosestPoint
};

exports.default = point;

/***/ }),

/***/ "./quaternion.js":
/*!***********************!*\
  !*** ./quaternion.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Quaternion = function () {
  function Quaternion(x, y, z, w) {
    _classCallCheck(this, Quaternion);

    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.w = w !== undefined ? w : 1;
  }

  _createClass(Quaternion, [{
    key: "setFromAxisAngle",
    value: function setFromAxisAngle(axis, angle) {
      var halfAngle = angle / 2,
          s = Math.sin(halfAngle);

      this.x = axis.x * s;
      this.y = axis.y * s;
      this.z = axis.z * s;
      this.w = Math.cos(halfAngle);

      return this;
    }
  }, {
    key: "multiplyQuaternions",
    value: function multiplyQuaternions(a, b) {
      var qax = a.x,
          qay = a.y,
          qaz = a.z,
          qaw = a.w;
      var qbx = b.x,
          qby = b.y,
          qbz = b.z,
          qbw = b.w;

      this.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
      this.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
      this.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
      this.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

      return this;
    }
  }, {
    key: "setFromRotationMatrix",
    value: function setFromRotationMatrix(m) {
      var te = m.elements,
          m11 = te[0],
          m12 = te[4],
          m13 = te[8],
          m21 = te[1],
          m22 = te[5],
          m23 = te[9],
          m31 = te[2],
          m32 = te[6],
          m33 = te[10],
          trace = m11 + m22 + m33,
          s = void 0;

      if (trace > 0) {

        s = 0.5 / Math.sqrt(trace + 1.0);

        this.w = 0.25 / s;
        this.x = (m32 - m23) * s;
        this.y = (m13 - m31) * s;
        this.z = (m21 - m12) * s;
      } else if (m11 > m22 && m11 > m33) {

        s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);

        this.w = (m32 - m23) / s;
        this.x = 0.25 * s;
        this.y = (m12 + m21) / s;
        this.z = (m13 + m31) / s;
      } else if (m22 > m33) {

        s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);

        this.w = (m13 - m31) / s;
        this.x = (m12 + m21) / s;
        this.y = 0.25 * s;
        this.z = (m23 + m32) / s;
      } else {

        s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);

        this.w = (m21 - m12) / s;
        this.x = (m13 + m31) / s;
        this.y = (m23 + m32) / s;
        this.z = 0.25 * s;
      }

      return this;
    }
  }]);

  return Quaternion;
}();

exports.default = Quaternion;

/***/ }),

/***/ "./rect.js":
/*!*****************!*\
  !*** ./rect.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lineSegment = __webpack_require__(/*! ./lineSegment.js */ "./lineSegment.js");

var _lineSegment2 = _interopRequireDefault(_lineSegment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function rectToLineSegments(rect) {
  var top = {
    start: {
      x: rect.left,
      y: rect.top
    },
    end: {
      x: rect.left + rect.width,
      y: rect.top

    }
  };
  var right = {
    start: {
      x: rect.left + rect.width,
      y: rect.top
    },
    end: {
      x: rect.left + rect.width,
      y: rect.top + rect.height

    }
  };
  var bottom = {
    start: {
      x: rect.left + rect.width,
      y: rect.top + rect.height
    },
    end: {
      x: rect.left,
      y: rect.top + rect.height

    }
  };
  var left = {
    start: {
      x: rect.left,
      y: rect.top + rect.height
    },
    end: {
      x: rect.left,
      y: rect.top

    }
  };
  var lineSegments = [top, right, bottom, left];

  return lineSegments;
}

function distanceToPoint(rect, point) {
  var minDistance = 655535;
  var lineSegments = rectToLineSegments(rect);

  lineSegments.forEach(function (segment) {
    var distance = _lineSegment2.default.distanceToPoint(segment, point);

    if (distance < minDistance) {
      minDistance = distance;
    }
  });

  return minDistance;
}

// Returns top-left and bottom-right points of the rectangle
function rectToPoints(rect) {
  var rectPoints = {
    topLeft: {
      x: rect.left,
      y: rect.top
    },
    bottomRight: {
      x: rect.left + rect.width,
      y: rect.top + rect.height
    }
  };

  return rectPoints;
}

// Returns whether two non-rotated rectangles are intersected
function doesIntersect(rect1, rect2) {
  var intersectLeftRight = void 0;
  var intersectTopBottom = void 0;

  var rect1Points = rectToPoints(rect1);
  var rect2Points = rectToPoints(rect2);

  if (rect1.width >= 0) {
    if (rect2.width >= 0) {
      intersectLeftRight = !(rect1Points.bottomRight.x <= rect2Points.topLeft.x || rect2Points.bottomRight.x <= rect1Points.topLeft.x);
    } else {
      intersectLeftRight = !(rect1Points.bottomRight.x <= rect2Points.bottomRight.x || rect2Points.topLeft.x <= rect1Points.topLeft.x);
    }
  } else if (rect2.width >= 0) {
    intersectLeftRight = !(rect1Points.topLeft.x <= rect2Points.topLeft.x || rect2Points.bottomRight.x <= rect1Points.bottomRight.x);
  } else {
    intersectLeftRight = !(rect1Points.topLeft.x <= rect2Points.bottomRight.x || rect2Points.topLeft.x <= rect1Points.bottomRight.x);
  }

  if (rect1.height >= 0) {
    if (rect2.height >= 0) {
      intersectTopBottom = !(rect1Points.bottomRight.y <= rect2Points.topLeft.y || rect2Points.bottomRight.y <= rect1Points.topLeft.y);
    } else {
      intersectTopBottom = !(rect1Points.bottomRight.y <= rect2Points.bottomRight.y || rect2Points.topLeft.y <= rect1Points.topLeft.y);
    }
  } else if (rect2.height >= 0) {
    intersectTopBottom = !(rect1Points.topLeft.y <= rect2Points.topLeft.y || rect2Points.bottomRight.y <= rect1Points.bottomRight.y);
  } else {
    intersectTopBottom = !(rect1Points.topLeft.y <= rect2Points.bottomRight.y || rect2Points.top <= rect1Points.bottomRight.y);
  }

  return intersectLeftRight && intersectTopBottom;
}

// Returns intersection points of two non-rotated rectangles
function getIntersectionRect(rect1, rect2) {
  var intersectRect = {
    topLeft: {},
    bottomRight: {}
  };

  if (!doesIntersect(rect1, rect2)) {
    return;
  }

  var rect1Points = rectToPoints(rect1);
  var rect2Points = rectToPoints(rect2);

  if (rect1.width >= 0) {
    if (rect2.width >= 0) {
      intersectRect.topLeft.x = Math.max(rect1Points.topLeft.x, rect2Points.topLeft.x);
      intersectRect.bottomRight.x = Math.min(rect1Points.bottomRight.x, rect2Points.bottomRight.x);
    } else {
      intersectRect.topLeft.x = Math.max(rect1Points.topLeft.x, rect2Points.bottomRight.x);
      intersectRect.bottomRight.x = Math.min(rect1Points.bottomRight.x, rect2Points.topLeft.x);
    }
  } else if (rect2.width >= 0) {
    intersectRect.topLeft.x = Math.min(rect1Points.topLeft.x, rect2Points.bottomRight.x);
    intersectRect.bottomRight.x = Math.max(rect1Points.bottomRight.x, rect2Points.topLeft.x);
  } else {
    intersectRect.topLeft.x = Math.min(rect1Points.topLeft.x, rect2Points.topLeft.x);
    intersectRect.bottomRight.x = Math.max(rect1Points.bottomRight.x, rect2Points.bottomRight.x);
  }

  if (rect1.height >= 0) {
    if (rect2.height >= 0) {
      intersectRect.topLeft.y = Math.max(rect1Points.topLeft.y, rect2Points.topLeft.y);
      intersectRect.bottomRight.y = Math.min(rect1Points.bottomRight.y, rect2Points.bottomRight.y);
    } else {
      intersectRect.topLeft.y = Math.max(rect1Points.topLeft.y, rect2Points.bottomRight.y);
      intersectRect.bottomRight.y = Math.min(rect1Points.bottomRight.y, rect2Points.topLeft.y);
    }
  } else if (rect2.height >= 0) {
    intersectRect.topLeft.y = Math.min(rect1Points.topLeft.y, rect2Points.bottomRight.y);
    intersectRect.bottomRight.y = Math.max(rect1Points.bottomRight.y, rect2Points.topLeft.y);
  } else {
    intersectRect.topLeft.y = Math.min(rect1Points.topLeft.y, rect2Points.topLeft.y);
    intersectRect.bottomRight.y = Math.max(rect1Points.bottomRight.y, rect2Points.bottomRight.y);
  }

  // Returns top-left and bottom-right points of intersected rectangle
  return intersectRect;
}

var rect = {
  distanceToPoint: distanceToPoint,
  getIntersectionRect: getIntersectionRect
};

exports.default = rect;

/***/ }),

/***/ "./vector3.js":
/*!********************!*\
  !*** ./vector3.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _quaternion = __webpack_require__(/*! ./quaternion.js */ "./quaternion.js");

var _quaternion2 = _interopRequireDefault(_quaternion);

var _math = __webpack_require__(/*! ./math.js */ "./math.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Based on THREE.JS
var Vector3 = function () {
  function Vector3(x, y, z) {
    _classCallCheck(this, Vector3);

    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }

  _createClass(Vector3, [{
    key: 'set',
    value: function set(x, y, z) {

      this.x = x;
      this.y = y;
      this.z = z;

      return this;
    }
  }, {
    key: 'setX',
    value: function setX(x) {

      this.x = x;

      return this;
    }
  }, {
    key: 'setY',
    value: function setY(y) {

      this.y = y;

      return this;
    }
  }, {
    key: 'setZ',
    value: function setZ(z) {

      this.z = z;

      return this;
    }
  }, {
    key: 'setComponent',
    value: function setComponent(index, value) {

      switch (index) {

        case 0:
          this.x = value;break;
        case 1:
          this.y = value;break;
        case 2:
          this.z = value;break;
        default:
          throw new Error('index is out of range: ' + index);

      }
    }
  }, {
    key: 'getComponent',
    value: function getComponent(index) {

      switch (index) {

        case 0:
          return this.x;
        case 1:
          return this.y;
        case 2:
          return this.z;
        default:
          throw new Error('index is out of range: ' + index);

      }
    }
  }, {
    key: 'copy',
    value: function copy(v) {

      this.x = v.x;
      this.y = v.y;
      this.z = v.z;

      return this;
    }
  }, {
    key: 'add',
    value: function add(v, w) {

      if (w !== undefined) {

        console.warn('DEPRECATED: Vector3\'s .add() now only accepts one argument. Use .addVectors( a, b ) instead.');

        return this.addVectors(v, w);
      }

      this.x += v.x;
      this.y += v.y;
      this.z += v.z;

      return this;
    }
  }, {
    key: 'addScalar',
    value: function addScalar(s) {

      this.x += s;
      this.y += s;
      this.z += s;

      return this;
    }
  }, {
    key: 'addVectors',
    value: function addVectors(a, b) {

      this.x = a.x + b.x;
      this.y = a.y + b.y;
      this.z = a.z + b.z;

      return this;
    }
  }, {
    key: 'sub',
    value: function sub(v, w) {

      if (w !== undefined) {

        console.warn('DEPRECATED: Vector3\'s .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');

        return this.subVectors(v, w);
      }

      this.x -= v.x;
      this.y -= v.y;
      this.z -= v.z;

      return this;
    }
  }, {
    key: 'subVectors',
    value: function subVectors(a, b) {

      this.x = a.x - b.x;
      this.y = a.y - b.y;
      this.z = a.z - b.z;

      return this;
    }
  }, {
    key: 'multiply',
    value: function multiply(v, w) {

      if (w !== undefined) {

        console.warn('DEPRECATED: Vector3\'s .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.');

        return this.multiplyVectors(v, w);
      }

      this.x *= v.x;
      this.y *= v.y;
      this.z *= v.z;

      return this;
    }
  }, {
    key: 'multiplyScalar',
    value: function multiplyScalar(scalar) {

      this.x *= scalar;
      this.y *= scalar;
      this.z *= scalar;

      return this;
    }
  }, {
    key: 'multiplyVectors',
    value: function multiplyVectors(a, b) {

      this.x = a.x * b.x;
      this.y = a.y * b.y;
      this.z = a.z * b.z;

      return this;
    }
  }, {
    key: 'applyMatrix3',
    value: function applyMatrix3(m) {

      var x = this.x;
      var y = this.y;
      var z = this.z;

      var e = m.elements;

      this.x = e[0] * x + e[3] * y + e[6] * z;
      this.y = e[1] * x + e[4] * y + e[7] * z;
      this.z = e[2] * x + e[5] * y + e[8] * z;

      return this;
    }
  }, {
    key: 'applyMatrix4',
    value: function applyMatrix4(m) {

      // Input: THREE.Matrix4 affine matrix

      var x = this.x,
          y = this.y,
          z = this.z;

      var e = m.elements;

      this.x = e[0] * x + e[4] * y + e[8] * z + e[12];
      this.y = e[1] * x + e[5] * y + e[9] * z + e[13];
      this.z = e[2] * x + e[6] * y + e[10] * z + e[14];

      return this;
    }
  }, {
    key: 'applyProjection',
    value: function applyProjection(m) {

      // Input: THREE.Matrix4 projection matrix

      var x = this.x,
          y = this.y,
          z = this.z;

      var e = m.elements;
      var d = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]); // Perspective divide

      this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * d;
      this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * d;
      this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * d;

      return this;
    }
  }, {
    key: 'applyQuaternion',
    value: function applyQuaternion(q) {

      var x = this.x;
      var y = this.y;
      var z = this.z;

      var qx = q.x;
      var qy = q.y;
      var qz = q.z;
      var qw = q.w;

      // Calculate quat * vector

      var ix = qw * x + qy * z - qz * y;
      var iy = qw * y + qz * x - qx * z;
      var iz = qw * z + qx * y - qy * x;
      var iw = -qx * x - qy * y - qz * z;

      // Calculate result * inverse quat

      this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
      this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
      this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

      return this;
    }
  }, {
    key: 'transformDirection',
    value: function transformDirection(m) {

      // Input: THREE.Matrix4 affine matrix
      // Vector interpreted as a direction

      var x = this.x,
          y = this.y,
          z = this.z;

      var e = m.elements;

      this.x = e[0] * x + e[4] * y + e[8] * z;
      this.y = e[1] * x + e[5] * y + e[9] * z;
      this.z = e[2] * x + e[6] * y + e[10] * z;

      this.normalize();

      return this;
    }
  }, {
    key: 'divide',
    value: function divide(v) {

      this.x /= v.x;
      this.y /= v.y;
      this.z /= v.z;

      return this;
    }
  }, {
    key: 'divideScalar',
    value: function divideScalar(scalar) {

      if (scalar !== 0) {

        var invScalar = 1 / scalar;

        this.x *= invScalar;
        this.y *= invScalar;
        this.z *= invScalar;
      } else {

        this.x = 0;
        this.y = 0;
        this.z = 0;
      }

      return this;
    }
  }, {
    key: 'min',
    value: function min(v) {

      if (this.x > v.x) {

        this.x = v.x;
      }

      if (this.y > v.y) {

        this.y = v.y;
      }

      if (this.z > v.z) {

        this.z = v.z;
      }

      return this;
    }
  }, {
    key: 'max',
    value: function max(v) {

      if (this.x < v.x) {

        this.x = v.x;
      }

      if (this.y < v.y) {

        this.y = v.y;
      }

      if (this.z < v.z) {

        this.z = v.z;
      }

      return this;
    }
  }, {
    key: 'clamp',
    value: function clamp(min, max) {

      // This function assumes min < max, if this assumption isn't true it will not operate correctly

      if (this.x < min.x) {

        this.x = min.x;
      } else if (this.x > max.x) {

        this.x = max.x;
      }

      if (this.y < min.y) {

        this.y = min.y;
      } else if (this.y > max.y) {

        this.y = max.y;
      }

      if (this.z < min.z) {

        this.z = min.z;
      } else if (this.z > max.z) {

        this.z = max.z;
      }

      return this;
    }
  }, {
    key: 'floor',
    value: function floor() {

      this.x = Math.floor(this.x);
      this.y = Math.floor(this.y);
      this.z = Math.floor(this.z);

      return this;
    }
  }, {
    key: 'ceil',
    value: function ceil() {

      this.x = Math.ceil(this.x);
      this.y = Math.ceil(this.y);
      this.z = Math.ceil(this.z);

      return this;
    }
  }, {
    key: 'round',
    value: function round() {

      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
      this.z = Math.round(this.z);

      return this;
    }
  }, {
    key: 'roundToZero',
    value: function roundToZero() {

      this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
      this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
      this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z);

      return this;
    }
  }, {
    key: 'negate',
    value: function negate() {

      return this.multiplyScalar(-1);
    }
  }, {
    key: 'dot',
    value: function dot(v) {

      return this.x * v.x + this.y * v.y + this.z * v.z;
    }
  }, {
    key: 'lengthSq',
    value: function lengthSq() {

      return this.x * this.x + this.y * this.y + this.z * this.z;
    }
  }, {
    key: 'length',
    value: function length() {

      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
  }, {
    key: 'lengthManhattan',
    value: function lengthManhattan() {

      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    }
  }, {
    key: 'normalize',
    value: function normalize() {

      return this.divideScalar(this.length());
    }
  }, {
    key: 'setLength',
    value: function setLength(l) {

      var oldLength = this.length();

      if (oldLength !== 0 && l !== oldLength) {

        this.multiplyScalar(l / oldLength);
      }

      return this;
    }
  }, {
    key: 'lerp',
    value: function lerp(v, alpha) {

      this.x += (v.x - this.x) * alpha;
      this.y += (v.y - this.y) * alpha;
      this.z += (v.z - this.z) * alpha;

      return this;
    }
  }, {
    key: 'cross',
    value: function cross(v, w) {

      if (w !== undefined) {

        console.warn('DEPRECATED: Vector3\'s .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.');

        return this.crossVectors(v, w);
      }

      var x = this.x,
          y = this.y,
          z = this.z;

      this.x = y * v.z - z * v.y;
      this.y = z * v.x - x * v.z;
      this.z = x * v.y - y * v.x;

      return this;
    }
  }, {
    key: 'crossVectors',
    value: function crossVectors(a, b) {

      var ax = a.x,
          ay = a.y,
          az = a.z;
      var bx = b.x,
          by = b.y,
          bz = b.z;

      this.x = ay * bz - az * by;
      this.y = az * bx - ax * bz;
      this.z = ax * by - ay * bx;

      return this;
    }
  }, {
    key: 'angleTo',
    value: function angleTo(v) {

      var theta = this.dot(v) / (this.length() * v.length());

      // Clamp, to handle numerical problems

      return Math.acos((0, _math.clamp)(theta, -1, 1));
    }
  }, {
    key: 'distanceTo',
    value: function distanceTo(v) {

      return Math.sqrt(this.distanceToSquared(v));
    }
  }, {
    key: 'distanceToSquared',
    value: function distanceToSquared(v) {

      var dx = this.x - v.x;
      var dy = this.y - v.y;
      var dz = this.z - v.z;

      return dx * dx + dy * dy + dz * dz;
    }
  }, {
    key: 'setFromMatrixPosition',
    value: function setFromMatrixPosition(m) {

      this.x = m.elements[12];
      this.y = m.elements[13];
      this.z = m.elements[14];

      return this;
    }
  }, {
    key: 'setFromMatrixScale',
    value: function setFromMatrixScale(m) {

      var sx = this.set(m.elements[0], m.elements[1], m.elements[2]).length();
      var sy = this.set(m.elements[4], m.elements[5], m.elements[6]).length();
      var sz = this.set(m.elements[8], m.elements[9], m.elements[10]).length();

      this.x = sx;
      this.y = sy;
      this.z = sz;

      return this;
    }
  }, {
    key: 'setFromMatrixColumn',
    value: function setFromMatrixColumn(index, matrix) {

      var offset = index * 4;

      var me = matrix.elements;

      this.x = me[offset];
      this.y = me[offset + 1];
      this.z = me[offset + 2];

      return this;
    }
  }, {
    key: 'equals',
    value: function equals(v) {

      return v.x === this.x && v.y === this.y && v.z === this.z;
    }
  }, {
    key: 'fromArray',
    value: function fromArray(array) {

      this.x = array[0];
      this.y = array[1];
      this.z = array[2];

      return this;
    }
  }, {
    key: 'toArray',
    value: function toArray() {

      return [this.x, this.y, this.z];
    }
  }, {
    key: 'clone',
    value: function clone() {

      return new Vector3(this.x, this.y, this.z);
    }
  }]);

  return Vector3;
}();

Vector3.prototype.projectOnVector = function () {

  var v1 = void 0,
      dot = void 0;

  return function (vector) {

    if (v1 === undefined) {
      v1 = new Vector3();
    }

    v1.copy(vector).normalize();

    dot = this.dot(v1);

    return this.copy(v1).multiplyScalar(dot);
  };
}();

Vector3.prototype.projectOnPlane = function () {

  var v1 = void 0;

  return function (planeNormal) {

    if (v1 === undefined) {
      v1 = new Vector3();
    }

    v1.copy(this).projectOnVector(planeNormal);

    return this.sub(v1);
  };
}();

Vector3.prototype.reflect = function () {

  // Reflect incident vector off plane orthogonal to normal
  // Normal is assumed to have unit length

  var v1 = void 0;

  return function (normal) {

    if (v1 === undefined) {
      v1 = new Vector3();
    }

    return this.sub(v1.copy(normal).multiplyScalar(2 * this.dot(normal)));
  };
}();

Vector3.prototype.clampScalar = function () {

  var min = void 0,
      max = void 0;

  return function (minVal, maxVal) {

    if (min === undefined) {

      min = new Vector3();
      max = new Vector3();
    }

    min.set(minVal, minVal, minVal);
    max.set(maxVal, maxVal, maxVal);

    return this.clamp(min, max);
  };
}();

Vector3.prototype.applyAxisAngle = function () {

  var quaternion = void 0;

  return function (axis, angle) {

    if (quaternion === undefined) {
      quaternion = new _quaternion2.default();
    }

    this.applyQuaternion(quaternion.setFromAxisAngle(axis.normalize(), angle));

    return this;
  };
}();

exports.default = Vector3;

/***/ })

/******/ });
});
//# sourceMappingURL=cornerstoneMath.js.map