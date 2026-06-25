exports.validateParty = (req, res, next) => {
    const { name, mobile_number, address } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }
    if (!mobile_number) {
        return res.status(400).json({ message: 'Mobile number is required' });
    }
    if (!address) {
        return res.status(400).json({ message: 'Address is required' });
    }
    next();
};