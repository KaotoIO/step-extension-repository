/**
 * This Interface will eventually come from @Kaoto/UI
 * it's being loosely defined here to easy local development
 **/

export interface IKaotoApi {
  step: { [p: string]: any };
  stepParams: { [p: string]: any };
  updateStep: (step: { [p: string]: any }) => void;
}
