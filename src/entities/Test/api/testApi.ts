import axiosInstance from "@/shared/api/axiosInstance";
import { TEST_ENDPOINTS } from "@/shared/api/endpoints";
import type {
  CreateTestPayload,
  GetTestsParams,
  Test,
  TestAnswer,
  TestResult,
} from "../types";

interface RawTest extends Omit<Test, "id"> {
  _id: string;
}

interface TestsResponse {
  tests: RawTest[];
  total: number;
  page: number;
  pages: number;
}

const normalizeTest = (raw: RawTest): Test => ({
  ...raw,
  id: raw._id,
  questions: raw.questions.map((q) => ({
    ...q,
    id: q.id ?? q._id,
  })),
});

export const testApi = {
  getTests: async (params: GetTestsParams) => {
    const { data } = await axiosInstance.get<TestsResponse>(
      TEST_ENDPOINTS.base,
      {
        params,
      }
    );
    return { ...data, tests: data.tests.map(normalizeTest) };
  },

  getGeneralTest: async (): Promise<Test | null> => {
    const { data } = await axiosInstance.get<TestsResponse>(
      TEST_ENDPOINTS.base,
      {
        params: { isGeneral: true, limit: 1 },
      }
    );
    return data.tests[0] ? normalizeTest(data.tests[0]) : null;
  },

  getTestById: async (id: string): Promise<Test> => {
    const { data } = await axiosInstance.get<RawTest>(TEST_ENDPOINTS.byId(id));
    return normalizeTest(data);
  },

  createTest: async (payload: CreateTestPayload): Promise<Test> => {
    const { data } = await axiosInstance.post<RawTest>(
      TEST_ENDPOINTS.base,
      payload
    );
    return normalizeTest(data);
  },

  submitAnswers: async (
    id: string,
    answers: TestAnswer[]
  ): Promise<TestResult> => {
    const { data } = await axiosInstance.post<TestResult>(
      TEST_ENDPOINTS.submit(id),
      {
        answers,
        submittedAt: new Date().toISOString(),
      }
    );
    return data;
  },

  getResults: async (id: string): Promise<TestResult[]> => {
    try {
      const { data } = await axiosInstance.get<TestResult[]>(
        TEST_ENDPOINTS.results(id)
      );
      return data;
    } catch (e) {
      const err = e as { response?: { status?: number } };
      if (err.response?.status === 404) return [];
      throw e;
    }
  },

  deleteResults: async (id: string): Promise<void> => {
    await axiosInstance.delete(TEST_ENDPOINTS.results(id));
  },
};
