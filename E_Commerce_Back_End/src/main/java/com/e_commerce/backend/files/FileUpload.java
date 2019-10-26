package com.e_commerce.backend.files;

import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Iterator;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.FileImageOutputStream;
import javax.imageio.stream.ImageOutputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileUpload {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(FileUpload.class);
	
	//N.T
	//if use string url then / must needed exple : String ABS_PATH = "/home/atif/SImages/";
	//if method connect with path then no need use / exple : Path PRE_COMPRESSION_ABS_PATH = Paths.get("/home/atif/PCSImages");
	//and if this type PRE_COMPRESSION_ABS_PATH.resolve(profileImageCode + ".jpeg")); then no need /
	private static final String ABS_PATH = "/home/atif/SImages/";
	private static final Path PRE_COMPRESSION_ABS_PATH = Paths
			.get("/home/atif/PCSImages");

	static String profileImageCode = null;
	
	
	
	

	public static void carouselFileUpload(MultipartFile profileImage, String pImageode) throws IOException {
		LOGGER.info("FROM class CarouselController,method: fileUpload()--ENTER--");
		profileImageCode = pImageode;
		FileImageOutputStream output;
		BufferedImage bufferedrealImage = null;
		BufferedImage resizedRealImage=null;
		Files.copy(profileImage.getInputStream(), PRE_COMPRESSION_ABS_PATH.resolve(profileImageCode + ".jpeg"));
		File forCompressionProfileImage = new File("/home/atif/PCSImages/" + profileImageCode + ".jpeg");
		
		// MUST USE STRING URL NOT A VARIABLE
		String prefix = "/home/atif/PCSImages/";
		String[] ids = { profileImageCode };
		String ext = ".jpeg";
		Image[] images = new Image[ids.length];
		for (int i = 0; i < images.length; i++) {
			String path = prefix + ids[i] + ext;
			bufferedrealImage = ImageIO.read(new File(path));
		}
         //FOR RESIZE TO 220*220
		
		resizedRealImage=scale(bufferedrealImage, 1440, 900);
		
		
		// CONVERT INTO STREAM
		OutputStream os = new FileOutputStream(forCompressionProfileImage);
		// NEED A WRITER TO CONVERT A SPECIFIC FORMAT
		Iterator<ImageWriter> writers = ImageIO.getImageWritersByFormatName("jpeg");
		ImageWriter writer = (ImageWriter) writers.next();

		// CREATE IMAGE OUTPUT STREAM
		ImageOutputStream ios = ImageIO.createImageOutputStream(os);
		writer.setOutput(ios);

		ImageWriteParam param = writer.getDefaultWriteParam();

		param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
		param.setCompressionQuality(1.0F); // compress the quality value you prefer
		File file = new File("/home/atif/SImages/" + profileImageCode + ".jpeg");
		output = new FileImageOutputStream(file);
		writer.setOutput(output);
		//CPMPRESSION OCCURED FOLLOWING resizedRealImage LIKE:WIDTH,HEIGHT TYPE
		writer.write(null, new IIOImage(resizedRealImage, null, null), param);

		os.close();
		ios.close();
		writer.dispose();
		// MUST USE STRING URL NOT A VARIABLE
		File afterCompressionImageForDelete = new File(
				"/home/atif/PCSImages/" + profileImageCode + ".jpeg");
		afterCompressionImageForDelete.delete();
		LOGGER.info("FROM class CarouselController,method: fileUpload()--DELETED--"
				+ profileImageCode + ".jpeg");
		
		File afterCompressionDeleteImageNullPacket = new File(
				"/home/atif/PCSImages/" + profileImageCode + ".jpeg");
		afterCompressionDeleteImageNullPacket.delete();
		LOGGER.info("FROM class CarouselController,method: fileUpload()--DELETED--"
				+ "/home/atif/PCSImages/"+ profileImageCode + ".jpeg");
		
		
		
		
		
		profileImageCode = null;
	}
     
		
//for product

	public static void productFileUpload(MultipartFile profileImage, String pImageode) throws IOException {
		LOGGER.info("FROM class CarouselController,method: fileUpload()--ENTER--");
		profileImageCode = pImageode;
		FileImageOutputStream output;
		BufferedImage bufferedrealImage = null;
		BufferedImage resizedRealImage=null;
		Files.copy(profileImage.getInputStream(), PRE_COMPRESSION_ABS_PATH.resolve(profileImageCode + ".jpeg"));
		File forCompressionProfileImage = new File("/home/atif/PCSImages/" + profileImageCode + ".jpeg");
		
		// MUST USE STRING URL NOT A VARIABLE
		String prefix = "/home/atif/PCSImages/";
		String[] ids = { profileImageCode };
		String ext = ".jpeg";
		Image[] images = new Image[ids.length];
		for (int i = 0; i < images.length; i++) {
			String path = prefix + ids[i] + ext;
			bufferedrealImage = ImageIO.read(new File(path));
		}
         //FOR RESIZE TO 220*220
		
		resizedRealImage=scale(bufferedrealImage, 400, 400);
		
		
		// CONVERT INTO STREAM
		OutputStream os = new FileOutputStream(forCompressionProfileImage);
		// NEED A WRITER TO CONVERT A SPECIFIC FORMAT
		Iterator<ImageWriter> writers = ImageIO.getImageWritersByFormatName("jpeg");
		ImageWriter writer = (ImageWriter) writers.next();

		// CREATE IMAGE OUTPUT STREAM
		ImageOutputStream ios = ImageIO.createImageOutputStream(os);
		writer.setOutput(ios);

		ImageWriteParam param = writer.getDefaultWriteParam();

		param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
		param.setCompressionQuality(1.0F); // compress the quality value you prefer
		File file = new File("/home/atif/SImages/" + profileImageCode + ".jpeg");
		output = new FileImageOutputStream(file);
		writer.setOutput(output);
		//CPMPRESSION OCCURED FOLLOWING resizedRealImage LIKE:WIDTH,HEIGHT TYPE
		writer.write(null, new IIOImage(resizedRealImage, null, null), param);

		os.close();
		ios.close();
		writer.dispose();
		// MUST USE STRING URL NOT A VARIABLE
		File afterCompressionImageForDelete = new File(
				"/home/atif/PCSImages/" + profileImageCode + ".jpeg");
		afterCompressionImageForDelete.delete();
		LOGGER.info("FROM class CarouselController,method: fileUpload()--DELETED--"
				+ profileImageCode + ".jpeg");
		
		File afterCompressionDeleteImageNullPacket = new File(
				"/home/atif/PCSImages/" + profileImageCode + ".jpeg");
		afterCompressionDeleteImageNullPacket.delete();
		LOGGER.info("FROM class CarouselController,method: fileUpload()--DELETED--"
				+ "/home/atif/PCSImages/"+ profileImageCode + ".jpeg");
		
		
		
		
		
		profileImageCode = null;
	}
      //PROFILE IMAGE RESIZE
	private static BufferedImage scale(BufferedImage imageToScale, int dWidth, int dHeight) {
        BufferedImage scaledImage = null;
        if (imageToScale != null) {
            scaledImage = new BufferedImage(dWidth, dHeight, imageToScale.getType());
            Graphics2D graphics2D = scaledImage.createGraphics();
            graphics2D.drawImage(imageToScale, 0, 0, dWidth, dHeight, null);
            graphics2D.dispose();
        }
        return scaledImage;
    }	
		

}