export class ParticipantNotFoundError extends Error {
    constructor() {
      super("Participant not found");
      this.name = "ParticipantNotFoundError";
    }
  }
  
  export class CongressNotFoundError extends Error {
    constructor() {
      super("Congress not found");
      this.name = "CongressNotFoundError";
    }
  }
  
  export class AlreadyCheckedInError extends Error {
    constructor() {
      super("Participant already checked in for this congress");
      this.name = "AlreadyCheckedInError";
    }
  }
  