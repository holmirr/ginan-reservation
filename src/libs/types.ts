// CronJob型の定義
export interface CronJob {
  cron_job_id: number;
  url: string;
  http_auth_user: string;
  http_auth_pw: string;
  cron_expression: string;
  timezone: string;
  http_method: string;
  http_headers: string;
  http_message_body: string;
  timeout: number;
  success_criterion: number;
  success_regexp: string;
  failure_regexp: string;
  send_email: number;
  email_threshold: number;
  send_slack: number;
  slack_threshold: number;
  slack_url: string;
  send_webhook: number;
  webhook_http_method: string;
  webhook_url: string;
  webhook_data: string[];
  status: number;
  epds_occupied: number;
  cron_job_name: string;
  description: string;
  group_id: number;
  total_successes: number;
  total_failures: number;
  current_failures: number;
}

// メタデータの型定義
export interface Meta {
  page: number;
  page_size: number;
  result_count: number;
  total_count: number;
}

// APIレスポンスの型定義
export interface CronJobsResponse {
  cron_jobs: CronJob[];
  meta: Meta;
}
