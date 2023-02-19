class ContextService {
    constructor() {
        this.context = {};
    }

    setContext(context) {
        this.context = context;
    }

    getContext() {
        return this.context;
    }
}

export const contextService = new ContextService();