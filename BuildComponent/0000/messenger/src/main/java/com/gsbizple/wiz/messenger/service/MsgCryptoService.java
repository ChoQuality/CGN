package com.gsbizple.wiz.messenger.service;

import com.gsbizple.wiz.common.dto.LoginInfoDto;
import com.gsbizple.wiz.messenger.dao.MessengerDao;
import com.gsbizple.wiz.messenger.dto.MessageDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import java.nio.charset.StandardCharsets;
import java.security.*;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.*;
import java.util.Base64;
import java.util.function.Function;

@Slf4j
@Service
public class MsgCryptoService {
    private final MessengerDao<LoginInfoDto,String> messengerDao;
    private final Cipher messengerCipher;
    private final KeyFactory keyFactory = KeyFactory.getInstance("RSA");
    private final Function<String,String> funcLoadPublicKey = pemPublicKey -> pemPublicKey
                .replace("-----BEGIN PUBLIC KEY-----", "")
                .replace("-----END PUBLIC KEY-----", "")
                .replaceAll("\\s", ""); // 공백 제거
    private final Function<String,String> funcLoadPrivateKey = pemPrivateKey -> pemPrivateKey
            .replace("-----BEGIN PRIVATE KEY-----", "")
            .replace("-----END PRIVATE KEY-----", "")
            .replaceAll("\\s", "");
    private final Function<String, RSAPublicKey> funcConvertPublicKey = pemString -> {
        byte[] keyBytes = Base64.getDecoder().decode(pemString);
        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(keyBytes);
        RSAPublicKey publicKey = null;
        try {
            return  (RSAPublicKey) keyFactory.generatePublic(keySpec);
        } catch (InvalidKeySpecException e) {
            throw new RuntimeException(e);
        }
    };
    private final Function<String, RSAPrivateKey> funcConvertPrivateKey = pemString ->
    {
        byte[] keyBytes = Base64.getDecoder().decode(pemString);
        PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(keyBytes);
        RSAPrivateKey privateKey = null;
        try {
            return  (RSAPrivateKey) keyFactory.generatePrivate(keySpec);
        } catch (InvalidKeySpecException e) {
            throw new RuntimeException(e);
        }
    };
    public MsgCryptoService(MessengerDao<LoginInfoDto, String> messengerDao, @Qualifier("messengerCipher") Cipher messengerCipher) throws NoSuchAlgorithmException {
       this.messengerDao = messengerDao;
       this.messengerCipher = messengerCipher;
    }

    public String fetchPublicKey(LoginInfoDto loginInfoDto) {
        var strPublicKey = messengerDao.selectOne("CryptoMapper.fetchPublicKey",loginInfoDto);
        return funcLoadPublicKey.apply(strPublicKey);
    }

    public MessageDto decryptMessage(LoginInfoDto loginInfoDto,MessageDto messageDto) throws InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
        var strPrivateKey = messengerDao.selectOne("CryptoMapper.fetchPrivateKey",loginInfoDto);
        var privateKey = funcLoadPrivateKey.andThen(funcConvertPrivateKey).apply(strPrivateKey);
        messengerCipher.init(Cipher.DECRYPT_MODE,privateKey);
        byte[] encryptedText = Base64.getDecoder().decode(messageDto.getMessageContent());
        byte[] decryptedText = messengerCipher.doFinal(encryptedText);
        var decryptedMessage = new String(decryptedText, StandardCharsets.UTF_8);
        messageDto.setMessageContent(decryptedMessage);
        return messageDto;
    }

    public MessageDto encryptMessage(LoginInfoDto loginInfoDto,MessageDto messageDto) throws InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
        var strPublicKey = messengerDao.selectOne("CryptoMapper.fetchPublicKey",loginInfoDto);
        var publicKey = funcLoadPublicKey.andThen(funcConvertPublicKey).apply(strPublicKey);
        messengerCipher.init(Cipher.ENCRYPT_MODE,publicKey);
        byte[] encryptedText = messengerCipher.doFinal(messageDto.getMessageContent().getBytes());
        String encodedText = Base64.getEncoder().encodeToString(encryptedText);
        messageDto.setMessageContent(encodedText);
        return messageDto;
    }
}
