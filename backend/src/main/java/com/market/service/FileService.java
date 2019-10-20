package com.market.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.market.exception.FileUploadException;
import com.market.property.FileUploadProperties;

@Service
public class FileService {
	private final Path fileLocation;
	
	@Autowired
    public FileService(FileUploadProperties prop) { 
        this.fileLocation = Paths.get(prop.getUploadDir())
                .toAbsolutePath().normalize();
        
        try {
            Files.createDirectories(this.fileLocation);
        }catch(Exception e) {
            throw new FileUploadException("파일을 업로드할 디렉토리를 생성하지 못했습니다.", e);
        }
    }
	
	public String storeFile(MultipartFile file, String changFileName) {
        String fileName = StringUtils.cleanPath(changFileName + "." + FilenameUtils.getExtension(file.getOriginalFilename()));
        String imagePath = null;
        String resourcePath = "/product/";
        
        try {
            if(fileName.contains(".."))
                throw new FileUploadException("파일명에 부적합 문자가 포함되어 있습니다. " + fileName);
            
            Path targetLocation = this.fileLocation.resolve(fileName);
            
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            imagePath = resourcePath + fileName;
            
            return imagePath;
        }catch(Exception e) {
            throw new FileUploadException("["+fileName+"] 파일 업로드에 실패하였습니다. 다시 시도하십시오.",e);
        }
    }

}
