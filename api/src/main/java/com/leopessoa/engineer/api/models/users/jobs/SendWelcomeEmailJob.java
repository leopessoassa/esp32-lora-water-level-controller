package com.leopessoa.engineer.api.models.users.jobs;

import com.leopessoa.engineer.api.models.users.jobs.handlers.SendWelcomeEmailJobHandler;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.jobrunr.jobs.lambdas.JobRequest;
import org.jobrunr.jobs.lambdas.JobRequestHandler;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SendWelcomeEmailJob implements JobRequest {

    private Long userId;

    @Override
    public Class<? extends JobRequestHandler> getJobRequestHandler() {
        return SendWelcomeEmailJobHandler.class;
    }
}