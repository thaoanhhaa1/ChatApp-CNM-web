const { override, useBabelRc } = require('customize-cra');

module.exports = override(
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useBabelRc(),
    (config) => {
        config.ignoreWarnings = [
            ...(config.ignoreWarnings || []),
            (warning) => warning.message && warning.message.includes('Invalid URL'),
        ];
        return config;
    }
);
