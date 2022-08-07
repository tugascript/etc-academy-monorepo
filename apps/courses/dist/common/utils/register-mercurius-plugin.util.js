"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMercuriusPlugins = void 0;
async function registerMercuriusPlugins(app, plugins) {
    if (!plugins || plugins.length === 0)
        return;
    for (let i = 0; i < plugins.length; i++) {
        const plugin = plugins[i];
        await app.register(plugin.plugin, plugin.options);
    }
}
exports.registerMercuriusPlugins = registerMercuriusPlugins;
//# sourceMappingURL=register-mercurius-plugin.util.js.map