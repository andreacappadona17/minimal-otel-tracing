import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { W3CTraceContextPropagator } from "@opentelemetry/core";

const tracingUrl =
  process.env.OTEL_EXPORTER_OTLP_ENDPOINT || "http://tempo:4318/v1/traces";

const sdk = new NodeSDK({
  serviceName: "frontend",
  traceExporter: new OTLPTraceExporter({
    url: tracingUrl,
  }),
  textMapPropagator: new W3CTraceContextPropagator(),
  instrumentations: [
    getNodeAutoInstrumentations({
      "@opentelemetry/instrumentation-fs": {
        enabled: false,
      },
    }),
  ],
});
sdk.start();
