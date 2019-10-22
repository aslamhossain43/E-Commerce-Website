package com.e_commerce.backend.files;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileUpload {
	private static final Path ABS_PATH = Paths.get("/home/atif/SImages");
	
	private static final Logger LOGGER = LoggerFactory.getLogger(FileUpload.class);

	public static void fileUpload(MultipartFile pFile, String pCode) {
		LOGGER.info("FROM piFileUpload method");
         if (!(pCode.equals(null))) {
			
		try {
			Files.copy(pFile.getInputStream(), ABS_PATH.resolve(pCode + ".jpg"));
	
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
         }else {
        	 LOGGER.info("FROM piFileUpload method, piCode or apiCode is null");
		}
        

	}
	
		

}