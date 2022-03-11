import { NamedTensorMap, ModelPredictConfig, ModelTensorInfo } from '@tensorflow/tfjs-core';
import { TFLiteModel } from '@tensorflow/tfjs-tflite';

declare const setup: (tfliteWasmPath: string) => Promise<void>;

declare const sampleRate = 16000;

declare const loadModel: ({ path, quant }: {
    path: string;
    quant?: "dynamic" | "f16" | undefined;
}) => Promise<void>;
declare type DtlnProcessorNodeOptions = {
    /**
     * the number of channels
     *
     * Preferred to set this value to 1 with mobile devices
     * for performance reasons.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createScriptProcessor
     * @default 2
     */
    channelCount: number;
};
declare const createDtlnProcessorNode: (ctx: BaseAudioContext, { channelCount }: DtlnProcessorNodeOptions) => ScriptProcessorNode;

declare type ModelTensorInfoWithShape = ModelTensorInfo & Required<Pick<ModelTensorInfo, 'shape'>>;
declare class AecModel1 extends TFLiteModel {
    readonly inputs: [
        ModelTensorInfoWithShape,
        ModelTensorInfoWithShape,
        ModelTensorInfoWithShape
    ];
    readonly outputs: [ModelTensorInfoWithShape, ModelTensorInfoWithShape];
    predict(inputs: NamedTensorMap, config?: ModelPredictConfig): NamedTensorMap;
}
declare class AecModel2 extends TFLiteModel {
    readonly inputs: [
        ModelTensorInfoWithShape,
        ModelTensorInfoWithShape,
        ModelTensorInfoWithShape
    ];
    readonly outputs: [ModelTensorInfoWithShape, ModelTensorInfoWithShape];
    predict(inputs: NamedTensorMap, config?: ModelPredictConfig): NamedTensorMap;
}

declare const createAecProcess: (model1: AecModel1, model2: AecModel2) => (inputMic: Float32Array, inputLpb: Float32Array, output: Float32Array) => void;

declare const loadAecModel: ({ path, units, quant }: {
    path: string;
    units?: 512 | 128 | 256 | undefined;
    quant?: "dynamic" | "f16" | undefined;
}) => Promise<void>;
/**
 * connect mic first and lpb second
 */
declare const createDtlnAecProcessorNode: (ctx: BaseAudioContext) => ScriptProcessorNode;

export { DtlnProcessorNodeOptions, createAecProcess, createDtlnAecProcessorNode, createDtlnProcessorNode, loadAecModel, loadModel, sampleRate, setup };
