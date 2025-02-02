"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateQZTray = void 0;
const authenticateQZTray = (qz) => {
    // Authentication setup
    qz.security.setCertificatePromise(function (resolve, reject) {
        resolve(`-----BEGIN CERTIFICATE-----
MIIECzCCAvOgAwIBAgIGAZTGg0r6MA0GCSqGSIb3DQEBCwUAMIGiMQswCQYDVQQG
EwJVUzELMAkGA1UECAwCTlkxEjAQBgNVBAcMCUNhbmFzdG90YTEbMBkGA1UECgwS
UVogSW5kdXN0cmllcywgTExDMRswGQYDVQQLDBJRWiBJbmR1c3RyaWVzLCBMTEMx
HDAaBgkqhkiG9w0BCQEWDXN1cHBvcnRAcXouaW8xGjAYBgNVBAMMEVFaIFRyYXkg
RGVtbyBDZXJ0MB4XDTI1MDIwMTExNTQ0MFoXDTQ1MDIwMTExNTQ0MFowgaIxCzAJ
BgNVBAYTAlVTMQswCQYDVQQIDAJOWTESMBAGA1UEBwwJQ2FuYXN0b3RhMRswGQYD
VQQKDBJRWiBJbmR1c3RyaWVzLCBMTEMxGzAZBgNVBAsMElFaIEluZHVzdHJpZXMs
IExMQzEcMBoGCSqGSIb3DQEJARYNc3VwcG9ydEBxei5pbzEaMBgGA1UEAwwRUVog
VHJheSBEZW1vIENlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC/
QcJ7qjihUbxPbR2LB/goJScTe6LyDHEQhKWXHLDGOyBjrsOBI2O/sQ2mccpSH869
EVarHxM/ymawhKI28V9aAPs40sHJrWEUUGsBRHnOIp4sVoVrep4cNGc7UFDtX+R8
3sWn5shjgir99QpxFS0DmiAiSLN5WYt9z/7OH8Calukl24ZvzbUBnCXD5GIzls/q
iITEbhd2Cw4ekHp9tm4cNhAETU5maQltFprlCqdXcYN06f06SdioXY5OfHb79EMC
sM8WX2Et1dUX+aiQZLJxm+0OxsGj1Z0N3aVCZAEasJjI8OPRJ7052IjyBHbGg3Uk
kciejIbfus0jxC2H1aovAgMBAAGjRTBDMBIGA1UdEwEB/wQIMAYBAf8CAQEwDgYD
VR0PAQH/BAQDAgEGMB0GA1UdDgQWBBTF5AiEwPFeXW/TLLfnJbFmnailrzANBgkq
hkiG9w0BAQsFAAOCAQEAWMIX6M91A+4x/wgPOUikAN10CKixLwCx1O+ZsNIiEQo9
O9aVq7vEM66oaB5mL/W0dCVRVLobgQ7G/KBOJJgwaKuZbqNYX3s5AFtaMegsoH4W
lvJxNSJV97trERH4KdW64Os5KnG62Yco54/x9DpvM9sFhcQscj6lF5id/F2cvKts
p+/aqfYG48yVjQzjf3Z+9tha5y1cma0uv43zqyaCNAiI7ZhEJAg44mdUCOCV/Zjo
jUW4wpVhameYawV9nRNKdenxQg6Tm1YKr8u+0+HfAx88d1KD0mrqUJ1+lFFM8NHM
uyl36me0G5009+y8+mUu4IN/TB15gcHmDCstzFEi6A==
-----END CERTIFICATE-----
`);
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC/QcJ7qjihUbxP
bR2LB/goJScTe6LyDHEQhKWXHLDGOyBjrsOBI2O/sQ2mccpSH869EVarHxM/ymaw
hKI28V9aAPs40sHJrWEUUGsBRHnOIp4sVoVrep4cNGc7UFDtX+R83sWn5shjgir9
9QpxFS0DmiAiSLN5WYt9z/7OH8Calukl24ZvzbUBnCXD5GIzls/qiITEbhd2Cw4e
kHp9tm4cNhAETU5maQltFprlCqdXcYN06f06SdioXY5OfHb79EMCsM8WX2Et1dUX
+aiQZLJxm+0OxsGj1Z0N3aVCZAEasJjI8OPRJ7052IjyBHbGg3UkkciejIbfus0j
xC2H1aovAgMBAAECggEABOo3iWkG790DW1aBAgUlk0Eyf2AtKvjh4PGftcHsKF6g
RvTYm6rL/JhGswZ36LiziI1NA7Rr5gxEAPjvmDzcspnq2tDOX78/tZTEIzIIyqDT
csKTHCojAl41tu2p9BJY81KK6XUspM4ACoBaZoHg+GzksteDxom5ZCAiZVal4vMU
DxkbR0fd8lgl4UCJj199i/yuqFjfP6467nVhESOR3KIpuUKnLf1yb+knPN8DfjzA
vToUlu83jqTGKXjAWuOd1bgPLUZO5dVvaI+xSFudoUaFf7zVIQF1gQ0h6Q2SE1UH
A/sSuOVpD90YyY+F2VWOBhex/3vYSIr/7oor5nV75QKBgQD7gRw82uOv22ddEhks
VGzLU+Uz/EDQCzdAXLk1pHF8m7laZn94Lt5qDPQGchQTOZWqExJPG/GcAnBo/a3T
nC4ugIZ/bZ/KfpH994N6fJ3oHv7J7ogAGhlrSUtqOHrT/ptG3N3oiT8z6+nb7QGQ
79OWI70VX1XT+fZGMF9jtdrYWwKBgQDCrPSiXn/89abhKDEu167Utep7aiHwqms7
uoxTvgoxl2KjG+J+PE90E3XudQCbLAikqkzAR98D2F3cZHRF2FE0qC6vOAorx2iJ
rmsBjsnbioC/K1d6GG2bW75kws0cqEqR46ZYCIciLcJk+Jnm8yBZrGJ7FF9YOAjo
TaSdIvb9vQKBgFL4AMzCmSJGiw7VDaDmKQ3am15O9UKssIl3DVJ48UdeSANelOac
75qks0v9DkpZUNpOeFfIrCf/Vf4M0e9hMor8s2IOVAyFPLw/jww1WBJfR0Zufkcq
VQBjqZFdGIgfEjKKYlp4DHWgegGnakDaHT8GgzYtwS6w42G8S3ulXpDJAoGAemCb
UE6zimMqSrQnZtjy8IiDJJ3tRAr9agi1GheG9PHDceGfmddz4vYw1nv6q5EcxdbA
dMc5bINhTaBgb1+yfLWU01UZH7g1AQgCAHKwdjA1CvfF/9zHWjhsEY9bvT4V0mwX
L5P8zwGRCEQ3CzWfCoARUGnYHe7ruozEhHtsZMkCgYAK69Do3Vl+CSCXJbmSYhMe
K78U6F/dzE2kWpsSBXEoHblF+/qrJpGVNOjzOp2ALlGcgCFuk6qIPLKFe07B2XqW
vlPBbtA2w4iff4pZFyXDdC7OnVu7MzxzLsFRdp35UZQ6PJENNefkBSTIuCtQ5Fha
vqZfhGyefWNyCof32pHikg==
-----END PRIVATE KEY-----
`;
    qz.security.setSignatureAlgorithm('SHA512'); // Since 2.1
    qz.security.setSignaturePromise(function (toSign) {
        return function (resolve, reject) {
            try {
                const pk = eval('KEYUTIL.getKey(privateKey);');
                const sig = eval('new KJUR.crypto.Signature({"alg": "SHA512withRSA"});');
                sig.init(pk);
                sig.updateString(toSign);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const hex = sig.sign();
                resolve(eval('stob64(hextorstr(hex))'));
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        };
    });
};
exports.authenticateQZTray = authenticateQZTray;
