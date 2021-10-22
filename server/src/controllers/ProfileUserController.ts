import { Request, Response } from "express";
import { GetLast3MessagesService } from "../services/GetLast3MessagesService";
import { ProfileUserService } from "../services/ProfileUserService";

class ProfileUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request;
    const service = new ProfileUserService();

    try {
      const result = await service.execute(user_id);
      return response.json(result);
    } catch (error) {
      return response.json({ error: error.message });
    }
  }
}

export { ProfileUserController }