import { userModel } from '../models/userModel.js';

export const LiveController = {
    async getLive(req, res) {
        try {
            const user = await userModel.findByUsername('admin');
            if (user.live_url) {
                res.json(user.live_url)
            } else {
                return res.status(404).json({ error: "Live not found" })
            }
        } catch (error) {

        }
    }
}
