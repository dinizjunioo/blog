module.exports = {
    type: "object",
    properties: {
      email: {type: "string", format: "email"},
      senha: {type: "string", format: "password"},
    },
    required: ["email", "senha"],
    additionalProperties: false,
}