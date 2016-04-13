package org.domeos.global;


import org.domeos.framework.api.model.auth.User;

/**
 * Created by Administrator on 2015/7/21.
 */

public class GlobalConstant {
    public static final String clusterTableName = "cluster";
    public static final String deployTableName = "deployment";
    public static final String LoadBalancerTable = "load_balancer";
    public static final String LoadBalancerDeployMapTable = "load_balancer_deploy_map";
    public static final String projectTableName = "project";
    public static final String rsaKeypairTableName = "rsa_keypair";
    public static final String buildHistoryTableName = "build_history";
    public static final String uniqPortIndexTableName = "uniq_port_index";

    public static String HTTP_PREFIX = "http://";
    public static String HTTPS_PREFIX = "https://";
    public static String REGISTRY_VERSION = "/v2/";
    public static String REGISTRY_TAGLIST = "/tags/list";
    public static String REGISTRY_MANIFESTS = "/manifests/";
    public static String REGISTRY_HISTORY = "history";
    public static String REGISTRY_FSLAYERS = "fsLayers";
    public static String REGISTRY_BLOBS = "/blobs/";
    public static String REGISTRY_BLOBSUM = "blobSum";
    public static String REGISTRY_HISTORY_V1COMPATIBILITY = "v1Compatibility";
    public static String REGISTRY_HISTORY_V1COMPATIBILITY_CREATED = "created";
    public static String APPLICATION_JSON = "application/json";
    public static String CONTENT_TYPE_TEXT_JSON = "text/json";
    public static String DEPLOY_ID_STR = "deployId";
    public static String VERSION_STR = "version";
    public static String RC_NAME_PREFIX = "dmo-";
    public static String DISK_STR = "disk";
    public static String NODE_PORT_STR = "NodePort";
    public static String CLUSTER_IP_STR = "ClusterIP";
    public static String UTC_TIME = "UTC";
    public static String HTTP_CONTENTLENGTH = "Content-Length";

    public static ThreadLocal<User> userThreadLocal = new ThreadLocal<>();
}
