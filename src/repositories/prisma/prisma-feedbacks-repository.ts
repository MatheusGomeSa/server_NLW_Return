import { prisma } from "../../prisma";
import { FeedbacksRepository, FeedbacksCreateData } from "../Feeedbacks-respository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {

    async create({ type, comment, screenshot }: FeedbacksCreateData) {
        await prisma.feedback.create({
            data: {
                type,
                screenshot,
                comment
            }
        })
    }
}