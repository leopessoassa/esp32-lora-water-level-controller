package com.leopessoa.engineer.api.s3.repository;

import com.leopessoa.engineer.api.s3.UploadedFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UploadedFileRepository extends JpaRepository<UploadedFile, Long> {

}
