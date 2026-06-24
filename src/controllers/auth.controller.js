const authService = require('../services/auth.service');

const jwtExpiryToMs = (expiresIn) => {
    const match = String(expiresIn || '1d').match(/^(\d+)([dhms])$/i);
    if (!match) return 24 * 60 * 60 * 1000;
    const units = { d: 86400000, h: 3600000, m: 60000, s: 1000 };
    return parseInt(match[1], 10) * units[match[2].toLowerCase()];
};

exports.register = async (req, res, next) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { user, token } = await authService.login(req.body);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: jwtExpiryToMs(process.env.JWT_EXPIRES),
        });

        res.json({ user });
    } catch (error) {
        console.log(error, "error");
        next(error);
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    });
    res.json({ message: 'Logged out successfully' });
};
