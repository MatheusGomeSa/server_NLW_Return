import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)

describe("SubmitFeedback", () => {
    it('should be able to submit a feedback', async () => {

        await expect(submitFeedback.execute({
            type: "Bug",
            comment: "example comment",
            screenshot: "data:image/png;base64kamskmaskmaksmkamksmakm"
        })).resolves.not.toThrow();
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })
    it('should not be able to submit a feedback without type', async () => {

        await expect(submitFeedback.execute({
            type: "",
            comment: "example comment",
            screenshot: "data:image/png;base64kamskmaskmaksmkamksmakm"
        })).rejects.toThrow();
    })
    it('should not be able to submit a feedback without comment', async () => {

        await expect(submitFeedback.execute({
            type: "Bug",
            comment: "",
            screenshot: "data:image/png;base64kamskmaskmaksmkamksmakm"
        })).rejects.toThrow();
    })
    it('should not be able to submit a feedback with an screenshot invalid format', async () => {

        await expect(submitFeedback.execute({
            type: "Bug",
            comment: "example comment",
            screenshot: "test.png"
        })).rejects.toThrow();
    })

})