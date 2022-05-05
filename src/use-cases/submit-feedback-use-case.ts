import { throws } from "assert";
import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/Feeedbacks-respository";

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}
export class SubmitFeedbackUseCase {
    constructor(private feedbackRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ) { }
    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { comment, type, screenshot } = request;

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format')
        }

        if (!type) {
            throw new Error('Type is required')
        }
        if (!comment) {
            throw new Error('Comment is required')
        }
        await this.feedbackRepository.create({ comment, type, screenshot })

        await this.mailAdapter.sendMail({
            subject: "Novo feedback",
            body: [
                `<div style="font-family: sans-serif; font-size:16px;  color: #111;">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                `</div>`
            ].join("\n")
        })
    }
}